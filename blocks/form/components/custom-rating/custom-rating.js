/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-loop-func */
/**
 * Custom custom-rating component
 * Based on: Text Input
 */

/**
 * Decorates a custom form field component
 * @param {HTMLElement} fieldDiv
 *  The DOM element containing the field wrapper.
 * Refer to the documentation for its structure for each component.
 * @param {Object} fieldJson - The form json object for the component.
 * @param {HTMLElement} parentElement - The parent element of the field.
 * @param {string} formId - The unique identifier of the form.
 */

/**
 * Custom Rating Component
 */

export default function decorate(fieldDiv, fieldJson) {
  fieldDiv.classList.add('custom-rating');

  const props = fieldJson?.properties || fieldJson || {};
  const max = props.max || 5;

  let selected = 0;

  // Clear existing content
  fieldDiv.innerHTML = '';

  // Label
  if (props.label) {
    const label = document.createElement('label');
    label.textContent = props.label;
    fieldDiv.appendChild(label);
  }

  // Hidden input (for form submission)
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = props.name || 'custom-rating';

  // Stars container
  const starsContainer = document.createElement('div');
  starsContainer.className = 'stars';

  function renderStars() {
    starsContainer.innerHTML = '';

    for (let i = 1; i <= max; i++) {
      const currentValue = i; // ✅ fix for ESLint

      const star = document.createElement('span');
      star.textContent = '★';

      // Active stars
      if (currentValue <= selected) {
        star.classList.add('active');
      }

      // Click → set value
      star.addEventListener('click', () => {
        selected = currentValue;
        input.value = selected;
        renderStars();
      });

      // Hover preview
      star.addEventListener('mouseover', () => {
        // eslint-disable-next-line no-use-before-define
        highlightStars(currentValue);
      });

      star.addEventListener('mouseout', () => {
        highlightStars(selected);
      });

      starsContainer.appendChild(star);
    }
  }

  function highlightStars(count) {
    const stars = starsContainer.querySelectorAll('span');
    stars.forEach((star, index) => {
      star.classList.toggle('hover', index < count);
    });
  }

  // Initial render
  renderStars();

  // Append elements
  fieldDiv.append(starsContainer, input);

  return fieldDiv;
}
