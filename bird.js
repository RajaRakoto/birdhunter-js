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
				killCore(totalKilled, birdToKill); //on englobe l'appel de killCore dans une fonction pour que setTimeout ne met pas en conflit avec son parametre 'totalKilled'
			}, killDelay);
		});
		//--------- KILL SECTION (begin) --------
	};
}
//##############################################
//############## CLASS BIRD (end) ##############
//##############################################

/**********************************/
/****** GLOBAL (begin) ********/
/**********************************/
const bird = new Bird(); //instanciation de l'objet bird
let count = 1; //const
const speedMin = 3; //const
let sizeMin = 0.5;
// let sizeMax = 0.8;
let intervalId;

//TODO: working -> update args
//On englobe le generateur d'oiseau dans une fonction pour le boucler dans setInterval
birdObject = (birdNumbers, speedMax, sizeMax) => {
	bird.birdGen(
		randInt(1, birdNumbers), //id
		randInt(1, 60), //heightPosition
		randFloat(0, 1.5, 2), //beginDelay
		randFloat(speedMin, speedMax, 2), //speed
		randFloat(sizeMin, sizeMax, 2), //birdSize
		randFloat(0.5, 1, 1), //beatSpeed
		randFloat(0, 2, 2), //beatRealismBehaviour
	);
	count === birdNumbers ? clearInterval(intervalId) : count++;
};

//TODO: working -> update args
function START(birdNumbers, speedMax, sizeMax, birdInterval) {
	intervalId = setInterval(function () {
		birdObject(birdNumbers, speedMax, sizeMax);
	}, birdInterval * 1000); //birdInterval -> interval d'apparition en milliseconde (par defaut)
}

/********************************/
/****** GLOBAL (end) ********/
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
//--------- RANDOM SECTION (end) --------

//TODO: verified
//--------- AUDIO SECTION (begin) ---------
const ambianceAudio = new Audio(); //en dehors de la fonction forestAmbiance pour ne pas dupliquer le son a chaque chagement de la map

function forestAmbiance(ambianceType) {
	if (ambianceType == 1) {
		ambianceAudio.src = './ogg/birds-song-in-forest.ogg'; //delay 113000ms
	} else if (ambianceType == 2) {
		ambianceAudio.src = './ogg/afternoon-birds-song-in-forest.ogg'; //delay 113000ms
	}
	ambianceAudio.play();
}

const shotAudio = new Audio();
const shotGun = () => {
	shotAudio.src = './ogg/gun-shoot.ogg';
	shotAudio.play();
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
const resetBtn = document.querySelector('#kill-interface button');

//TODO: verified
resetBtn.addEventListener('click', () => {
	bird.resetDatabase();
	bird.getKillScore();
});

//---- set bird|env (modal control)
const validBtnSetBird = document.getElementById('valid-set-bird');
const validBtnSetEnv = document.getElementById('valid-set-env');
const numbersInput = document.getElementById('numbers-input');
const speedInput = document.getElementById('speed-input');
const sizeInput = document.getElementById('size-input');
const intervalInput = document.getElementById('interval-input');
const mapInput = document.getElementById('map-input');
const modalNotif = document.querySelector('.modal-notif');
const birdNotif = document.getElementById('bird-notif'); //section
const envNotif = document.getElementById('env-notif'); //section

//TODO: verified
//injection de la classe correspondant au test (modalErrorController et modalSuccessController) de la valeur en input (input.value)
function modalNotifCore(classinject, message, section) {
	classinject == 'modal-notif--error'
		? section.classList.remove('modal-notif--success')
		: section.classList.remove('modal-notif--error');
	section.classList.add(classinject);
	section.innerText = message;
}

//TODO: verified
//controller si la valeur en input (input.value) n'est pas compris entre min et max
let stopFlag = false; //ceci sert de drapeau pour appeler ou pas le declancheur START() - sa valeur varie du test effectuer dans modalErrorController et modalSuccessController
function modalErrorController(input, min, max, classinject, message, section) {
	if (input.value < min || input.value > max) {
		modalNotifCore(classinject, message, section);
		stopFlag = true;
	}
}

//TODO: verified
//controller si la valeur en input (input.value) est compris entre min et max
let inputCount = 1;
//sert simplement a verifier/compter les valeurs de 'input' modifiE dans modalSuccessController
function modalSuccessController(input, min, max, section) {
	if (input.value >= min && input.value <= max) {
		modalNotifCore('modal-notif--success', 'Saved successfully !', section);
		stopFlag = false;
	}

	// console.log(`[set bird]: input${inputCount++} -> ${input.value}`);
	return parseInt(input.value); //cast de 'input.value' en nombre entier
}

//TODO: verified
//ecouteur d'evenement pour les 'input' de 'set bird'
validBtnSetBird.addEventListener('click', () => {
	//IMPORTANT!!! modalSuccessController AVANT modalErrorController PUIS START() avec test de stopFlag
	//----------------- modalSuccessController (begin) -----------------
	let inputBird1 = modalSuccessController(numbersInput, 1, 50, birdNotif);
	let inputBird2 = modalSuccessController(speedInput, 3, 20, birdNotif);
	let inputBird3 = modalSuccessController(sizeInput, 0.5, 2, birdNotif);
	let inputBird4 = modalSuccessController(intervalInput, 1, 5, birdNotif);
	//----------------- modalSuccessController (end) -----------------
	//----------------- modalErrorController (begin) -----------------
	modalErrorController(
		numbersInput,
		1,
		50,
		'modal-notif--error',
		'Error ! the numbers must be between 1 and 50',
		birdNotif,
	);
	modalErrorController(
		speedInput,
		3,
		20,
		'modal-notif--error',
		'Error ! the speed must be between 3 and 20',
		birdNotif,
	);
	modalErrorController(
		sizeInput,
		0.5,
		2,
		'modal-notif--error',
		'Error ! the size must be between 0.5 and 2',
		birdNotif,
	);
	modalErrorController(
		intervalInput,
		1,
		5,
		'modal-notif--error',
		'Error ! the interval must be between 1 and 5',
		birdNotif,
	);
	//----------------- modalErrorController (end) -----------------
	if (!stopFlag) {
		START(inputBird1, inputBird2, inputBird3, inputBird4); //START CALLING
	}
});

//TODO: verified
function changeMap(choice) {
	switch (choice) {
		case 1:
			setInterval(forestAmbiance(1), 113000);
			bird.getEnv().style.backgroundImage = "url('./img/bg0.jpg')";
			break;
		case 2:
			setInterval(forestAmbiance(1), 113000);
			bird.getEnv().style.backgroundImage = "url('./img/bg1.jpg')";
			break;
		default:
			const allClouds = document.querySelectorAll('img');
			setInterval(forestAmbiance(2), 113000);
			bird.getEnv().style.backgroundImage = "url('./img/bg2.png')";
			allClouds.forEach(cloud => {
				//supprimer tout les nuages
				cloud.remove();
			});

			break;
	}
}

//TODO: verified
validBtnSetEnv.addEventListener('click', () => {
	let inputEnv1 = modalSuccessController(mapInput, 1, 3, envNotif);
	modalErrorController(
		mapInput,
		1,
		3,
		'modal-notif--error',
		'Error ! the map must be between 1 and 3',
		envNotif,
	);

	if (!stopFlag) {
		changeMap(inputEnv1);
	}
});

//TODO: working -> notification helper
//help notification
const numbersNotifyBtn = document.getElementById('numbers-notify-btn');
const speedNotifyBtn = document.getElementById('speed-notify-btn');
const sizeNotifyBtn = document.getElementById('size-notify-btn');
const intervalNotifyBtn = document.getElementById('interval-notify-btn');
const mapNotifyBtn = document.getElementById('map-notify-btn');

function helper(notifID) {
	let notifConcern = document.getElementById(notifID);
	notifConcern.classList.toggle('show');
}

numbersNotifyBtn.addEventListener('click', () => {
	helper('numbers-notify');
});

speedNotifyBtn.addEventListener('click', () => {
	helper('speed-notify');
});

sizeNotifyBtn.addEventListener('click', () => {
	helper('size-notify');
});

intervalNotifyBtn.addEventListener('click', () => {
	helper('interval-notify');
});

mapNotifyBtn.addEventListener('click', () => {
	helper('map-notify');
});

//---------- UI SECTION (end) --------
//######################################
//############# UTILS (end) ############
//######################################

//CALLING (audio, bird, ...)
changeMap(1);
bird.getKillScore();
