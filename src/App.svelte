<script>
	import Space from './Space.svelte';
	import game_store from './game-store.js';
	import {nextMove} from './requests.js';
	import gameStore from './game-store.js';

	let errorMessage;

	class GameState{
		constructor(state = null){
			if(state == null){
				this.update({
					board: ["", "", "", "", "", "", "", "", ""],
					nextPlayer: '',
					winner: undefined,
					numberOfPeeps: 0
				});
			}
			else{
				this.update(state);
			}
		}
		update(state){
			this.board = state.board;
			this.nextPlayer = state.nextPlayer;
			this.numberOfPlayers = state.numberOfPeeps;
			this.winner = state.winner;
			return this;
		}
	};

	let gameState = new GameState();

	game_store.subscribe( data => {
		gameState = new GameState(data);
		// console.log('data from store', data);
		// console.log('gameState', gameState);
	});

	async function takeSpace(space){
		console.log('takeSpace', space);
		if(gameState.winner || !gameStore.isConnect)
			return;

		errorMessage = await nextMove(space);
	} 
</script>

<style>
	main {
		width: 475px;
		margin: 0 auto;
		height: 1000px;
	}

	.row {
		display: flex;
	}

	button {
		width: 100%;
		margin-top: 20px;
		border-radius: 0;
		background-color: lightblue;
		font-size: 30px;
		cursor: pointer;
	}

	button:hover {
		outline: none;
	}

	.errorMessage{
		color: red;
		font-size: 20px;
	}
</style>

<main>
	<h1>Tic Tac Toe</h1>
	<h2>Number of people playing: {gameState.numberOfPlayers}</h2>
	{#if gameState.winner == 'TIE'}
		<h2>Tie Game.</h2> 
	{:else if gameState.winner}
		<h2>Winner is: {gameState.winner} !!!</h2>
	{:else}
		<h2>Next Player: {gameState.nextPlayer}</h2>
	{/if}
	<div class="row">
		<Space space="{gameState.board[0]}" on:click={() => takeSpace(0)}></Space>
		<Space space="{gameState.board[1]}" on:click={() => takeSpace(1)}></Space>
		<Space space="{gameState.board[2]}" on:click={() => takeSpace(2)}></Space>
	</div>
	<div class="row">
		<Space space="{gameState.board[3]}" on:click={() => takeSpace(3)}></Space>
		<Space space="{gameState.board[4]}" on:click={() => takeSpace(4)}></Space>
		<Space space="{gameState.board[5]}" on:click={() => takeSpace(5)}></Space>
	</div>
	<div class="row">
		<Space space="{gameState.board[6]}" on:click={() => takeSpace(6)}></Space>
		<Space space="{gameState.board[7]}" on:click={() => takeSpace(7)}></Space>
		<Space space="{gameState.board[8]}" on:click={() => takeSpace(8)}></Space>
	</div>
	{#if gameState.winner}	
	<button>New Game</button>
	{/if}
	{#if errorMessage}	
	<p class="errorMessage">{errorMessage}</p>
	{/if}
</main>

