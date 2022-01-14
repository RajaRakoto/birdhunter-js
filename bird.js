class Bird {
	createDivElement = () => {
		return document.createElement('div');
	};

	getEnv = () => {
		return document.getElementById('environment');
	};

  //TODO: fix decal bug
	autoDestruct = () => {
    const env = this.getEnv();
    console.log(env.firstChild.nextSibling);
    const toDel = env.firstChild.nextSibling;
    toDel.remove();
	};

	birdGen = (
		id,
		heightPosition,
		beginDelay,
		speed,
		beatSpeed,
		beatRealismBehaviour,
	) => {
		//TODO: add ID
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

		/*
    TODO: recuperer la valeur de speed (duree du parcours)
    TODO: duree auto destruction (lifeTime) = speed 
    TODO: chaque instance declanche une auto destruction de ce dernier apres la duree du 'lifeTime'
    */

		console.log('speed: ' + speed + 's');
		let lifeTime = speed * 1000; //duree de vie d'un oiseau
		console.log('lifeTime: ' + lifeTime + 'ms');

		//delait de l'execution de l'autodestruction par rapport a la duree de vie "lifeTime"
		setTimeout(this.autoDestruct, lifeTime);

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
heightPosition[1;40], 
beginDelay[0,N], 
speed[5,N], 
beatSpeed[0.5;1.5], 
beatRealismBehaviour[0;2.xx]
*/

//TODO: verified
count = 1;
birdNumbers = 10; //nombre d'oiseau a afficher
birdInterval = 2 * 1000; //interval d'apparition en milliseconde 
let bird = new Bird();

//TODO: verified
//On englobe le generateur d'oiseau dans une fonction afin de poivoir boucler dans setInterval
birdObject = () => {
	bird.birdGen(
		randInt(1, 999),
		randInt(1, 40),
		randFloat(0, 1.5, 2),
		randInt(2, 10),
		randFloat(0.5, 1.5, 1),
		randFloat(0, 2, 2),
	);

	//casseur de setInterval
	if (count === birdNumbers) {
		clearInterval(intervalId);
	} else {
		count++;
	}
};

//TODO: verified
//OBJECT LOOP CALLING
intervalId = setInterval(birdObject, birdInterval);
