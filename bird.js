class Bird {
	//TODO: verified
	createDivElement = () => {
		return document.createElement('div');
	};

	getEnv = () => {
		return document.getElementById('environment');
	};

	//TODO: verified
	birdGen = (
		heightPosition,
		beginDelay,
		speed,
		beatSpeed,
		beatRealismBehaviour,
	) => {
		const newBirdContainer = this.createDivElement();
		newBirdContainer.className = 'bird-container bird-container--shift';
		newBirdContainer.style.setProperty(
			'--heightPosition',
			heightPosition + '%',
		); //position en hauteur de depart varie de 1 a 40 pourcent
		newBirdContainer.style.setProperty('--beginDelay', beginDelay + 's'); //delai de depart (ex: 0 si aucun delai)
		newBirdContainer.style.setProperty('--speed', speed + 's'); //vitesse de deplacement pour parcourir l'environnement varie de 5 a N seconde

		const newBird = this.createDivElement();
		newBird.className = 'bird bird--beat';
		newBird.style.setProperty('--beatSpeed', beatSpeed + 's'); //vitesse de battement varie de 0.5 a 1.5 seconde
		newBird.style.setProperty(
			'--beatRealismBehaviour',
			beatRealismBehaviour + 's',
		); //comportement du battement varie de 0 a 2,xx seconde

		//ajouter l'element 'newBird' en tant que fils de 'newBirdContainer'
		newBirdContainer.appendChild(newBird);
		let birdObject = newBirdContainer;

		const env = this.getEnv();
		const node = document.getElementById('node');

		//injecter 'birdObject' avant 'node' dans 'env'
		env.insertBefore(birdObject, node);
	};
}

//TODO: verified
randInt = (min, max) => {
	return Math.round(Math.random() * max + min);
};

randFloat = (min, max, after) => {
	let randCore = Math.random() * max + min;
	return randCore.toFixed(after);
};

/*
--- ARGS ---
heightPosition[1;40], 
beginDelay[0,N], 
speed[5,N], 
beatSpeed[0.5;1.5], 
beatRealismBehaviour[0;2.xx]
*/

count = 0;
birdNumbers = 3;
let bird = new Bird();

for (let count = 0; count < birdNumbers; count++) {
	bird.birdGen(
		randInt(1, 40),
		randFloat(0, 1.5, 2),
		randInt(2, 10),
		randFloat(0.5, 1.5, 1),
		randFloat(0, 2, 2),
	);
}
