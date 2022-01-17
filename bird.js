//################################################
//############## CLASS BIRD (begin) ##############
//################################################
class Bird {
	//TODO: verified
	createDivElement = () => {
		return document.createElement('div');
	};

	//TODO: verified
	getEnv = () => {
		return document.getElementById('environment');
	};

	//TODO: verified
	getKillScore = () => {
		const killDisplay = document.getElementById('kill-display');
		let killScore = localStorage.getItem('killed-id');
		return (killDisplay.innerText = killScore);
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
		newBirdContainer.addEventListener('click', () => {
			const killDisplay = document.getElementById('kill-display');
			const totalKilled = this.killedDatabase(); //on recupere la valeur de 'killed-id' dans local storage
			const birdToKill = document.getElementById(newBirdContainer.id);
			const killDelay = 1 * 1000; //delai avant de supprimer l'element 'birdToKill' (2s)
			killDisplay.innerText = totalKilled;

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

/**********************************/
/****** GLOBAL VAR (begin) ********/
/**********************************/
/*
--- ARGS ---
id
heightPosition[1;60], 
beginDelay[0,1.5], 
speed[perso], 
birdSize[perso], 
beatSpeed[0.5;1.5], 
beatRealismBehaviour[0;2.xx]
*/
const bird = new Bird(); //instanciation de l'objet bird
let count = 1;
const birdNumbers = 30; //nombre d'oiseau a afficher (max 30)
const birdInterval = 5 * 1000; //interval d'apparition en milliseconde (min 5)
const speedMin = 3; //const
let speedMax = 8; //const
const sizeMin = 0.5;
const sizeMax = 0.8;
const ambianceType = 0; //1 ou 2
/********************************/
/****** GLOBAL VAR (end) ********/
/********************************/

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

//TODO: verified
//--------- AUDIO SECTION (begin) ---------
function forestAmbiance(ambianceType) {
	const audio = new Audio();
	if (ambianceType == 1) {
		audio.src = './ogg/birds-song-in-forest.ogg'; //delay 113000ms
	} else if (ambianceType == 2) {
		audio.src = './ogg/afternoon-birds-song-in-forest.ogg'; //delay 113000ms
	}
	return audio.play();
}

const shotGun = () => {
	const audio = new Audio();
	audio.src = './ogg/gun-shoot.ogg';
	return audio.play();
};

bird.getEnv().addEventListener('click', () => {
	shotGun();
});
//--------- AUDIO SECTION (end) ---------

//TODO: verified (no full screen adaptable)
//--------- CURSOR SECTION (begin) -------
const cursor = document.getElementById('cursor');
//le parametre e (event) permet de tracer l'evenement (trace les donnees de l'evenement)
window.addEventListener('mousemove', e => {
	//permet de suivre automatiquement le pointeur
	cursor.style.left = e.pageX + 'px';
	cursor.style.top = e.pageY + 'px';
});
//--------- CURSOR SECTION (begin) -------
//--------- UI SECTION (begin) -------
//---- reset data
const resetBtn = document.querySelector('#user-interface button');

resetBtn.addEventListener('click', () => {
	bird.resetDatabase();
	bird.getKillScore();
});

//---- set bird (modal control)
const validBtnSetBird = document.getElementById('valid-set-bird');
const speedInput = document.getElementById('speed-input');
const modalNotif = document.querySelector('.modal-notif');

function modalNotifCore(classInject, Message) {
	classInject == 'modal-notif--error'
		? modalNotif.classList.remove('modal-notif--success')
		: modalNotif.classList.remove('modal-notif--error');
	modalNotif.classList.add(classInject);
	modalNotif.innerText = Message;
}

validBtnSetBird.addEventListener('click', () => {
	//set speed
	if (speedInput.value < 3 || speedInput.value > 20) {
		modalNotifCore(
			'modal-notif--error',
			'Error ! the speed must be between 3 and 20',
		);
	} else {
		modalNotifCore('modal-notif--success', 'Saved successfully!');
		speedMax = speedInput.value;
	}
});

//---------- UI SECTION (end) --------
//######################################
//############# UTILS (end) ############
//######################################

//######################################
//############ MAIN (begin) ############
//######################################
//On englobe le generateur d'oiseau dans une fonction pour le boucler dans setInterval
birdObject = () => {
	bird.birdGen(
		randInt(1, birdNumbers), //max birdNumbers
		randInt(1, 60), //max 60
		randFloat(0, 1.5, 2), //const
		randFloat(speedMin, speedMax, 2), //perso
		randFloat(sizeMin, sizeMax, 2), //perso
		randFloat(0.5, 1, 1), //const
		randFloat(0, 2, 2), //const
	);

	//casseur de setInterval
	count === birdNumbers ? clearInterval(intervalId) : count++;
};

//CALLING (audio, bird)
bird.getKillScore();
setInterval(forestAmbiance(ambianceType), 113000);
const intervalId = setInterval(birdObject, birdInterval);
//######################################
//############# MAIN (end) #############
//######################################
