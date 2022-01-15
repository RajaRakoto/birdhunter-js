//################################################
//############## CLASS BIRD (begin) ##############
//################################################
class Bird {
	createDivElement = () => {
		return document.createElement('div');
	};

	getEnv = () => {
		return document.getElementById('environment');
	};

	/* ---------- DATABASE SECTION (begin) ---------- */
	/*
	NOTE (local storage):
		- getItem = recuperer la valeur d'une cle
		- setItem = modifier la valeur d'une cle
	*/
	//sert a reinitialiser le database
	//TODO: verified
	resetDatabase = () => {
		const resetValue = 0;
		localStorage.setItem('killed-id', resetValue);
	};

	//TODO: verified
	//sert a stocker/compter les oiseaux tuEs
	killedDatabase = () => {
		let killedCounter = localStorage.getItem('killed-id');

		killedCounter++;
		localStorage.setItem('killed-id', killedCounter);

		return killedCounter;
	};
	/* ------------ DATABASE SECTION (end) --------- */

	birdGen = (
		id,
		heightPosition,
		beginDelay,
		speed,
		birdSize,
		beatSpeed,
		beatRealismBehaviour,
	) => {
		//tODO: verified
		//--------- MAKER SECTION (begin) --------
		const newBirdContainer = this.createDivElement();
		newBirdContainer.id = 'bird-id-' + id; //id maker
		newBirdContainer.className = 'bird-container bird-container--shift';
		newBirdContainer.style.setProperty(
			'--heightPosition',
			heightPosition + '%',
		); //position en hauteur de depart varie de 1 a 40 pourcent
		newBirdContainer.style.setProperty('--beginDelay', beginDelay + 's'); //delai de depart (ex: 0 si aucun delai)
		newBirdContainer.style.setProperty('--speed', speed + 's'); //vitesse de 	deplacement pour parcourir l'environnement varie de 5 a N seconde
		newBirdContainer.style.setProperty('--birdSize', birdSize); //taille de chaque oiseau

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
		const entryPoint = document.getElementById('entryPoint');
		//injecter 'birdObject' avant 'entryPoint' dans 'env'
		env.insertBefore(birdObject, entryPoint);
		//--------- MAKER SECTION (end) --------

		//=====================================================

		// //TODO: auto destruction (bug)
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

		//TODO: verified
		//--------- KILL SECTION (begin) --------
		// this.resetDatabase();
		newBirdContainer.addEventListener('click', () => {
			const birdToKill = document.getElementById(newBirdContainer.id);
			const totalKilled = this.killedDatabase(); //on recupere la valeur de 'killed-id' dans local storage
			const killDelay = 1 * 1000; //delai avant de supprimer l'element 'birdToKill' (2s)

			//TODO: verified (feat: add drop anim)
			function killAnimation() {
				newBird.style.setProperty('--beatSpeed', 10 + 's'); //const
				function anim0() {
					newBird.style.setProperty('--beatRealismBehaviour', 50 + 's');
				}
				setTimeout(anim0, 1000); //const
			}

			killAnimation();

			function killCore(totalKilled, birdToKill) {
				console.log(
					newBirdContainer.id + ' killed 💀 | total = ' + totalKilled,
				);
				birdToKill.remove();
			}

			// let tmp = killCore(totalKilled);
			setTimeout(function () {
				killCore(totalKilled, birdToKill); //on englobe l'appelle de killCore dans une fonction pour que setTimeout ne met pas en conflit avec son parametre 'totalKilled'
			}, killDelay);
		});
		//--------- KILL SECTION (begin) --------
	};
}
//##############################################
//############## CLASS BIRD (end) ##############
//##############################################

//######################################
//############ UTILS (begin) ###########
//######################################
//TODO: verified
//--------- RANDOM SECTION (begin) --------
randInt = (min, max) => {
	return Math.round(Math.random() * max + min);
};

randFloat = (min, max, after) => {
	let randCore = Math.random() * max + min;
	return randCore.toFixed(after);
};
//--------- RANDOM SECTION (begin) --------

//TODO: working
//--------- AUDIO SECTION (begin) ---------
const forestAmbiance = ambianceType => {
	const audio = new Audio();
	if (ambianceType == 1) {
		audio.src = './ogg/birds-song-in-forest.ogg'; //delay 113000ms
	} else if (ambianceType == 2) {
		audio.src = './ogg/afternoon-birds-song-in-forest.ogg'; //delay 113000ms
	}
	return audio.play();
};

const shotGun = () => {
	const audio = new Audio();
	audio.src = './ogg/gun-shoot.ogg';
	return audio.play();
};

window.addEventListener('click', () => {
	shotGun();
});
//--------- AUDIO SECTION (end) ---------
//######################################
//############# UTILS (end) ############
//######################################

//######################################
//############ MAIN (begin) ############
//######################################
/*
--- ARGS ---
id
heightPosition[1;60], 
beginDelay[0,1.5], 
speed[4,N], 
birdSize[0.2,0.8], 
beatSpeed[0.5;1.5], 
beatRealismBehaviour[0;2.xx]
*/
let count = 1;
const birdNumbers = 20; //nombre d'oiseau a afficher (max 30)
const birdInterval = 5 * 1000; //interval d'apparition en milliseconde (min 5)
const ambianceType = 1; //1 ou 2
const bird = new Bird();

//On englobe le generateur d'oiseau dans une fonction pour le boucler dans setInterval
birdObject = () => {
	bird.birdGen(
		randInt(1, birdNumbers), //max birdNumbers
		randInt(1, 60), //max 60
		randFloat(0, 1.5, 2), //const
		randFloat(4, 8, 2), //perso (default = randFloat(4, 8, 2),)
		randFloat(0.2, 0.5, 2), //const
		randFloat(0.5, 1.5, 1), //const
		randFloat(0, 2, 2), //const
	);

	//casseur de setInterval

	if (count === birdNumbers) {
		clearInterval(intervalId);
	} else {
		count++;
	}
};

//CALLING (audio, bird)
setInterval(forestAmbiance(ambianceType), 113000);
const intervalId = setInterval(birdObject, birdInterval);
//######################################
//############# MAIN (end) #############
//######################################
