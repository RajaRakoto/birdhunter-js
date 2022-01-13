/* 
BIRDGENERATOR() => (1 bird[object] = 1 bird-container[--shift] + 1 bird[--beat]) 
*/

//genere un nombre entier aleatoire entre min et max
//TODO: verified
randInt = (min, max) => {
	return Math.round(Math.random() * max + min);
};

//genere un nombre decimal aleatoire entre min et max a N (=after) chiffre apres virgule
//TODO: verified
randFloat = (min, max, after) => {
	let randCore = Math.random() * max + min;
	return randCore.toFixed(after);
};

//generateur d'oiseau
birdGenerator = (position, beatSpeed, beatRealismBehaviour) => {
	//def birdContainer
	//TODO: verified
	const birdContainer = document.createElement('div');
	birdContainer.classList.toggle('bird-container');
	birdContainer.classList.toggle('bird-container--shift');

	//def bird
	//TODO: verified
	const bird = document.createElement('div');
	bird.classList.toggle('bird');
	bird.classList.toggle('bird--beat');

	//def environment (= background)
	//TODO: verified
	const env = document.getElementById('environment');

	//inject bird to birdContainer and environment
	//TODO: verified
	birdContainer.appendChild(bird);
	env.appendChild(birdContainer);

	//beat's settings
	//TODO: verified
	bird.style.setProperty('--beat-speed', beatSpeed + 's'); //vitesse de battement varie de 0.5 a 1.5 seconde
	bird.style.setProperty('--beat-realismBehaviour', beatRealismBehaviour + 's'); //comportement du battement varie de 0 a 2,xx seconde

	//speed|position's settings
	//TODO: verified
	const getPositionClass = document.querySelector('.bird-container');
	getPositionClass.style.setProperty('--startingPostition', position + '%'); //position de depart varie de 1 a 40 pourcent
	//TODO: fix
	// getPositionClass.style.setProperty('--birdSpeed', speed + 's'); //vitesse de chaque oiseau pour atteindre sa destination varie entre 5 a 10s
};

//CALLING
birdGenerator(randInt(1, 40), randFloat(0.5, 1.5, 1), randFloat(0, 2, 2));
birdGenerator(randInt(1, 40), randFloat(0.5, 1.5, 1), randFloat(0, 2, 2));
birdGenerator(randInt(1, 40), randFloat(0.5, 1.5, 1), randFloat(0, 2, 2));
