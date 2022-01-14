class Bird {
	createDivElement = () => {
		return document.createElement('div');
	};

	getEnv = () => {
		return document.getElementById('environment');
	};

	birdGen = (
		id,
		heightPosition,
		beginDelay,
		speed,
		beatSpeed,
		beatRealismBehaviour,
	) => {
		//TODO: verified
		const newBirdContainer = this.createDivElement();
		newBirdContainer.id = 'bird-id-' + id; //id maker
		newBirdContainer.className = 'bird-container bird-container--shift';
		newBirdContainer.style.setProperty(
			'--heightPosition',
			heightPosition + '%',
		); //position en hauteur de depart varie de 1 a 40 pourcent
		newBirdContainer.style.setProperty('--beginDelay', beginDelay + 's'); //delai de depart (ex: 0 si aucun delai)
		newBirdContainer.style.setProperty('--speed', speed + 's'); //vitesse de deplacement pour parcourir l'environnement varie de 5 a N seconde

		//TODO: verified
		const newBird = this.createDivElement();
		newBird.className = 'bird bird--beat';
		newBird.style.setProperty('--beatSpeed', beatSpeed + 's'); //vitesse de battement varie de 0.5 a 1.5 seconde
		newBird.style.setProperty(
			'--beatRealismBehaviour',
			beatRealismBehaviour + 's',
		); //comportement du battement varie de 0 a 2,xx seconde

		//TODO: verified
		//ajouter l'element 'newBird' en tant que fils de 'newBirdContainer'
		newBirdContainer.appendChild(newBird);
		let birdObject = newBirdContainer;
		const env = this.getEnv();
		const entryPoint = document.getElementById('entryPoint');
		//injecter 'birdObject' avant 'entryPoint' dans 'env'
		env.insertBefore(birdObject, entryPoint);

		//=====================================================

		// //TODO: delete by id
		// function getScreenCoords(element) {
		// 	//const syntax
		// 	let position = element.getBoundingClientRect();
		// 	return window.screenX + position.right;
		// }

		// let intervalId = setInterval(autoDestruction, 100); //best calling interval = 50~200

		// function autoDestruction() {
		// 	//const syntax
		// 	// console.log(getScreenCoords(newBirdContainer));
		// 	if (getScreenCoords(newBirdContainer) >= 1993) {
		// 		//default valur 1993
		// 		const firstChild = env.firstChild.nextSibling;
		// 		console.log(firstChild.id + ' - Destroy !');
		// 		const birdToDestruct = document.getElementById(`${firstChild.id}`);
		// 		birdToDestruct.remove();
		// 		clearInterval(intervalId);
		// 	}
		// }

		//=====================================================
	};
}

//TODO: verified
randInt = (min, max) => {
	return Math.round(Math.random() * max + min);
};

//TODO: verified
randFloat = (min, max, after) => {
	let randCore = Math.random() * max + min;
	return randCore.toFixed(after);
};

/*
--- ARGS ---
id
heightPosition[1;40], 
beginDelay[0,N], 
speed[5,N], 
beatSpeed[0.5;1.5], 
beatRealismBehaviour[0;2.xx]
*/

//TODO: verified
let count = 1; //const
let birdNumbers = 50; //nombre d'oiseau a afficher (max 30)
let birdInterval = 1 * 1000; //interval d'apparition en milliseconde (min 1)

let bird = new Bird();

//TODO: verified
//On englobe le generateur d'oiseau dans une fonction pour le boucler dans setInterval
birdObject = () => {
	bird.birdGen(
		randInt(1, 999), //max 999
		randInt(1, 60), //max 60
		randFloat(0, 1.5, 2), //const
		randInt(4, 8), //(min 5)
		randFloat(0.5, 1.5, 1), //const
		randFloat(0, 2, 2), //const
	);

	//casseur de setInterval
	//TODO: verified
	if (count === birdNumbers) {
		clearInterval(intervalId);
	} else {
		count++;
	}
};

//TODO: verified
//OBJECT LOOP CALLING
let intervalId = setInterval(birdObject, birdInterval);
