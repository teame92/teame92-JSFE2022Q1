export const createBasicStructure = () => {
  const main = document.createElement('main');
  document.body.appendChild(main);
  const garageSection = document.createElement('section');
  garageSection.classList.add('garage-section');
  const winnersSection = document.createElement('section');
  winnersSection.classList.add('winners-section', 'visability--hidden'); 
  main.append(garageSection, winnersSection);
}