/* eslint-disable import/extensions */
import cardsData from './_cards.json';

export default function decorate(block) {
  const container = document.createElement('div');
  container.className = 'card-container';

  // Title
  const title = document.createElement('h3');
  title.className = 'card-title';
  title.textContent = 'Select Credit Card';

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'card-wrapper';

  cardsData.forEach((card) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    // Header
    const header = document.createElement('div');
    header.className = 'card-header';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'card';
    radio.value = card.id;

    const label = document.createElement('span');
    label.textContent = card.title;

    header.append(radio, label);

    // Image
    const imgDiv = document.createElement('div');
    imgDiv.className = 'card-image';

    const img = document.createElement('img');
    img.src = card.image;
    img.alt = 'card';

    imgDiv.appendChild(img);

    // Benefits
    const ul = document.createElement('ul');
    ul.className = 'card-benefits';

    card.benefits.forEach((benefit) => {
      const li = document.createElement('li');
      li.textContent = benefit;
      ul.appendChild(li);
    });

    // Click behavior
    cardDiv.addEventListener('click', () => {
      // Remove active from all
      wrapper.querySelectorAll('.card').forEach((c) => {
        c.classList.remove('active');
      });

      // Add active to selected
      cardDiv.classList.add('active');

      // Check radio
      radio.checked = true;
    });

    cardDiv.append(header, imgDiv, ul);
    wrapper.appendChild(cardDiv);
  });
<<<<<<< HEAD
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
<<<<<<< HEAD
  block.replaceChildren(ul);
=======
  block.textContent = '';
  block.append(ul);
>>>>>>> df58285 (Initial commit)
=======

  container.append(title, wrapper);
  block.append(container);
>>>>>>> b5a9482 (Added custom cards component)
}
