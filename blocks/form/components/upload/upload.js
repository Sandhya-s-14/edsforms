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

  // ✅ ADD TITLE (THIS IS THE FIX)
  const label = document.createElement('div');
  label.className = 'field-label';
  label.textContent = props['jcr:title'] || props.label || 'Upload File';

  // Create input
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
  dragText.textContent = props.dragDropText || 'Drag & Drop files here';

  const fileName = document.createElement('div');
  fileName.className = 'file-name';

  const error = document.createElement('div');
  error.className = 'error';

  button.addEventListener('click', () => input.click());

  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    if (props.maxFileSize) {
      const maxSize = props.maxFileSize * 1024 * 1024;
      if (file.size > maxSize) {
        error.textContent = props.maxFileSizeMessage || 'File is too large';
        fileName.textContent = '';
        input.value = '';
        return;
      }
    }

    fileName.textContent = `Selected: ${file.name}`;
    error.textContent = '';
  });

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

  // ✅ ADD label here
  fieldDiv.innerHTML = '';
  fieldDiv.append(label, input, button, dragText, fileName, error);

  return fieldDiv;
}
