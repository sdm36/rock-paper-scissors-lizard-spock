<?php /*
**************************************************************************

Plugin Name:  Rock Paper Scissors Lizard Spock
Description:  Allows your users to play Rock Paper Scissors Lizard Spock using shortcode [rock_paper_scissors]
Plugin URI:   https://newburynew.media/rock-paper-scissors-lizard-spock
Version:      0.0.1
Author:       Gordon Abbotts & James Taylor
Author URI:   https://newburynew.media
Text Domain:  nnm
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html

*************************************************************************/

add_action('wp_enqueue_scripts', function(){
	wp_enqueue_style('rpsls-css', plugins_url( '/files/rpsls.css', __FILE__ ) , false, null);
	wp_enqueue_script('rpsls-js', plugins_url( '/files/rpsls.js', __FILE__ ), ['jquery'], null, true);
    
    wp_localize_script( 
        'rpsls-js', 
        'rpsls',
        array( 
            'ajaxurl'     => admin_url( 'admin-ajax.php' ),
            'ajaxnonce'   => wp_create_nonce( 'rpsls-js-validation' )
        ) 
    );	
});

add_shortcode('rock_paper_scissors', function($atts){
	$img_dir = plugins_url( '/images/', __FILE__ );
	$output = '<div id="playbox" class="rpsls"><div id="shelly" class="rpsls-img"><img class="aligncenter" src="' . $img_dir . '/sheldon.jpg" width="280" height="337" /></div>';
	$output.= '<div id="game"><h2>Think you can beat Sheldon at Rock, Paper, Scissors, Lizard, Spock?</h2><ul id="weapons"></ul>';
	$output.= '<div id="rpsls-init" class="rpsls-buttons"><button id="game-2" type="button">Play best of 3</button><button id="game-3" type="button">Play best of 5</button>';
	$output.= "</div><div id='response' class='rpsls-feedback'><p id='choices'></p><p id='result'></p></div></div><p class='disclaimer'>Please note: we don't claim to own any image or name rights to anything, it's just a free game!</p></div>";
	return $output;
});

function rpsls_get_rows(){
	$imgs = rpsls_images();
	$html ='';
	foreach($imgs as $k => $v) { 
		$src = plugins_url( '/images/', __FILE__ ) . $k . '/' . $k . '-' . $v . '.jpg';
		$html.= '<li><img id="' . $k . '" src="' . $src . '" alt="' . $k . '" /></li>';
	}
	return $html;
}

function rpsls_images(){
	$imgs = [
		'lizard'	=> rand(1,6),
		'paper'		=> rand(1,7),
		'rock'		=> rand(1,6),
		'scissors'	=> rand(1,9),
		'spock'		=> rand(1,9),
	];
	return $imgs;
}

function rpsls_logic($choice1, $choice2){
	$rules = array(
		'rock' => array(
			'scissors' 	=> array(
				'r' => true,
				'm' => "Rock crushes scissors",
			),
			'lizard'	=> array(
				'r' => true,
				'm' => "Rock crushes lizard",
			),
			'spock'		=> array(
				'r' => false,
				'm' => "Spock vaporises rock",
			),
			'paper'		=> array(
				'r' => false,
				'm' => "Paper covers rock",
			),
		),
		'paper' => array(
			'scissors' 	=> array(
				'r' => false,
				'm' => "Scissors cut paper",
			),
			'lizard'	=> array(
				'r' => false,
				'm' => "Lizard eats paper",
			),
			'spock'		=> array(
				'r' => true,
				'm' => "Paper disproves Spock",
			),
			'rock'		=> array(
				'r' => true,
				'm' => "Paper covers rock",
			),
		),
		'scissors' => array(
			 'paper'	=> array(
				'r' => true,
				'm' => "Scissors cut paper",
			),
			'lizard'	=> array(
				'r' => true,
				'm' => "Scissors decapitate lizard",
			),
			'spock'		=> array(
				'r' => false,
				'm' => "Spock smashes scissors",
			),
			'rock'		=> array(
				'r' => false,
				'm' => "Rock crushes scissors",
			),
		),
		'lizard' => array(
			 'paper'	=> array(
				'r' => true,
				'm' => "Lizard eats paper",
			),
			'scissors'	=> array(
				'r' => false,
				'm' => "Scissors decapitate lizard",
			),
			'spock'		=> array(
				'r' => true,
				'm' => "Lizard poisons Spock",
			),
			'rock'		=> array(
				'r' => false,
				'm' => "Rock crushes lizard",
			),
		),
		'spock' => array(
			 'paper'	=> array(
				'r' => false,
				'm' => "Paper disproves Spock",
			),
			'scissors'	=> array(
				'r' => true,
				'm' => "Spock smashes scissors",
			),
			'lizard'		=> array(
				'r' => false,
				'm' => "Lizard poisons Spock",
			),
			'rock'		=> array(
				'r' => true,
				'm' => "Spock vaporises rock",
			),
		),		
	);
	return $rules[$choice1][$choice2];
}

function rpsls_start(){
	check_ajax_referer('rpsls-js-validation', 'chk');
	if(!session_id()) {
		session_start();
	}
	$rpsls = array(
		'go' 	=> 0,
		'turns' => $_POST['game'],
		'scores' => array(
			'computer'  => 0,
			'player'	=> 0,
		),
	);
	$_SESSION['rpsls'] = $rpsls;
	$scoreboard = '<div class="scoreboard"><p>Player: <span id="player-score"></span></p><p>Sheldon: <span id="comp-score"></span></p><p>Games played: <span id="turns"></span></div>';
	$r = array(
		'msg' 			=> 'choose a weapon',
		'weapons'		=> rpsls_get_rows(),
		'scoreboard'	=> $scoreboard,
	);
	wp_send_json_success($r);
	wp_die();
}
add_action('wp_ajax_rpsls_start','rpsls_start');
add_action('wp_ajax_nopriv_rpsls_start','rpsls_start');

function rpsls_process_turn(){
	check_ajax_referer('rpsls-js-validation', 'chk');
	session_start();
	$rpsls = $_SESSION['rpsls'];
	$rpsls['go']++;
	$r = array(
		'player'	=> $_POST['choice'],
		'sheldon'	=> array_rand(rpsls_images(),1)
	);
	if($r['player'] == $r['sheldon']) {
		$result = array(
			'r'	=> 'draw'
		);
	} else {
		$result = rpsls_logic($r['player'], $r['sheldon']);
	}
	
	if($result['r'] === true) {
		$rpsls['scores']['player']++;
		$r['msg'] = 'You win! ' . $result['m'];

	} elseif($result['r'] === false) {
		$rpsls['scores']['computer']++;
		$r['msg'] = 'Sheldon wins! ' . $result['m'];
	} else {
		$r['msg'] = "It's a draw!";
	}
	$r['player_score'] = $rpsls['scores']['player'];
	$r['computer_score'] = $rpsls['scores']['computer'];
	if($r['player_score'] >= $rpsls['turns'] || $r['computer_score'] >= $rpsls['turns']) {
		if($rpsls['scores']['player'] > $rpsls['scores']['computer']) {
			$r['reset'] = 'You beat Sheldon in ' . $rpsls['go'] .' turns';
		} else {
			$r['reset'] = 'Sheldon beat You in ' . $rpsls['go'] .' turns';
		}
		session_destroy();
	} else {
		$_SESSION['rpsls'] = $rpsls;
		$r['weapons']	= rpsls_get_rows();
		
 	}
 	$r['info'] = $rpsls;
	wp_send_json_success($r);
	wp_die();
	
}
add_action('wp_ajax_rpsls_turn','rpsls_process_turn');
add_action('wp_ajax_nopriv_rpsls_turn','rpsls_process_turn');
