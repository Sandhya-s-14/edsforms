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
  // Add class for styling
  fieldDiv.classList.add('upload');

  // Extract properties safely
  const props = fieldJson?.properties || fieldJson || {};

  // Create input
  const input = document.createElement('input');
  input.type = 'file';
  input.name = props.name || 'upload';

  // Accept file types
  if (props.accept) {
    input.accept = Array.isArray(props.accept)
      ? props.accept.join(',')
      : props.accept;
  }

  // Button
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = props.buttonText || 'Upload File';

  // Drag text
  const dragText = document.createElement('p');
  dragText.textContent = props.dragDropText || 'Drag & Drop files here';

  // File name display
  const fileName = document.createElement('div');
  fileName.className = 'file-name';

  // Error message
  const error = document.createElement('div');
  error.className = 'error';

  // Click → open file dialog
  button.addEventListener('click', () => input.click());

  // File select handler
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;

    // Validate file size (MB)
    if (props.maxFileSize) {
      const maxSize = props.maxFileSize * 1024 * 1024;
      if (file.size > maxSize) {
        error.textContent = props.maxFileSizeMessage || 'File is too large';
        fileName.textContent = '';
        input.value = '';
        return;
      }
    }

    // Show file name
    fileName.textContent = `Selected: ${file.name}`;
    error.textContent = '';
  });

  // Drag over
  fieldDiv.addEventListener('dragover', (e) => {
    e.preventDefault();
    fieldDiv.classList.add('dragover');
  });

  // Drag leave
  fieldDiv.addEventListener('dragleave', () => {
    fieldDiv.classList.remove('dragover');
  });

  // Drop
  fieldDiv.addEventListener('drop', (e) => {
    e.preventDefault();
    fieldDiv.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (!file) return;

    input.files = e.dataTransfer.files;
    fileName.textContent = `Selected: ${file.name}`;
  });

  // Append elements
  fieldDiv.innerHTML = '';
  fieldDiv.append(input, button, dragText, fileName, error);

  return fieldDiv;
}
