// /* 
// BIRDGENERATOR() => (1 bird[object] = 1 bird-container[--shift] + 1 bird[--beat]) 
// */

// //genere un nombre entier aleatoire entre min et max
// //TODO: verified
// randInt = (min, max) => {
// 	return Math.round(Math.random() * max + min);
// };

// //genere un nombre decimal aleatoire entre min et max a N (=after) chiffre apres virgule
// //TODO: verified
// randFloat = (min, max, after) => {
// 	let randCore = Math.random() * max + min;
// 	return randCore.toFixed(after);
// };

// //generateur d'oiseau
// birdGenerator = (speed, beginDelay, heightPosition, beatSpeed, beatRealismBehaviour) => {
// 	//def birdContainer
// 	//TODO: OK
// 	const birdContainer = document.createElement('div');
// 	birdContainer.classList.toggle('bird-container');
// 	birdContainer.classList.toggle('bird-container--shift');

// 	//def bird
// 	//TODO: OK
// 	const bird = document.createElement('div');
// 	bird.classList.toggle('bird');
// 	bird.classList.toggle('bird--beat');

// 	//def environment (= background)
// 	//TODO: OK
// 	const env = document.getElementById('environment');

// 	//inject bird to birdContainer and environment
// 	//TODO: OK
// 	birdContainer.appendChild(bird);
// 	env.appendChild(birdContainer);

// 	//beat's settings
// 	//TODO: verified
// 	bird.style.setProperty('--beatSpeed', beatSpeed + 's'); //vitesse de battement varie de 0.5 a 1.5 seconde
// 	bird.style.setProperty('--beatRealismBehaviour', beatRealismBehaviour + 's'); //comportement du battement varie de 0 a 2,xx seconde

// 	//speed|XYposition's settings
// 	//TODO: verified
// 	const getPositionClass = document.querySelector('.bird-container');
// 	getPositionClass.style.setProperty('--heightPosition', heightPosition + '%'); //position en hauteur de depart varie de 1 a 40 pourcent
// 	getPositionClass.style.setProperty('--beginDelay', beginDelay + 's'); //delai de depart 
//   getPositionClass.style.setProperty('--speed', speed + 's'); //vitesse de deplacement

// };

// //CALLING
// //args => speed, beginDelay, heightPosition, beatSpeed, beatRealismBehaviour

// setInterval(birdGenerator(randInt(5, 10), 0, randInt(1, 40), randFloat(0.5, 1.5, 1), randFloat(0, 2, 2)),300);