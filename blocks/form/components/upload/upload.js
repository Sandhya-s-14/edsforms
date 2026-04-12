/**
 * Custom upload component
 * Based on: File Input
 */

/**
 * Decorates a custom form field component
 * @param {HTMLElement} fieldDiv
 * The DOM element containing the field wrapper.
 * Refer to the documentation for its structure for each component.
 * @param {Object} fieldJson - The form json object for the component.
 * @param {HTMLElement} parentElement - The parent element of the field.
 * @param {string} formId - The unique identifier of the form.
 */
/**
 * Custom upload component
 */

export default async function decorate(fieldDiv, fieldJson) {
  fieldDiv.classList.add('upload');

  const props = fieldJson?.properties || fieldJson || {};

  // CLEAR only inner content
  fieldDiv.innerHTML = '';

  // ✅ ADD TITLE (this was missing)
  const label = document.createElement('div');
  label.className = 'field-label';
  label.textContent = props['jcr:title'] || props.label || '';

  const input = document.createElement('input');
  input.type = 'file';
  input.name = props.name || 'upload';

  if (props.accept) {
    input.accept = Array.isArray(props.accept)
      ? props.accept.join(',')
      : props.accept;
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = props.buttonText || 'Upload File';

  const dragText = document.createElement('p');
  dragText.textContent = props.dragDropText || 'Drag and Drop To Upload';

  const fileName = document.createElement('div');
  fileName.className = 'file-name';

  const error = document.createElement('div');
  error.className = 'error';

  button.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    fileName.textContent = `Selected: ${file.name}`;
    error.textContent = '';
  });

  // DRAG EVENTS
  fieldDiv.addEventListener('dragover', (e) => {
    e.preventDefault();
    fieldDiv.classList.add('dragover');
  });

  fieldDiv.addEventListener('dragleave', () => {
    fieldDiv.classList.remove('dragover');
  });

  fieldDiv.addEventListener('drop', (e) => {
    e.preventDefault();
    fieldDiv.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (!file) return;

    input.files = e.dataTransfer.files;
    fileName.textContent = `Selected: ${file.name}`;
  });

  // ✅ IMPORTANT: label FIRST
  fieldDiv.append(label, input, button, dragText, fileName, error);

  return fieldDiv;
}
