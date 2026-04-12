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

  // ✅ OUTER WRAPPER (like other fields)
  const wrapper = document.createElement('div');
  wrapper.className = 'field-wrapper field-upload';

  // ✅ LABEL OUTSIDE
  const label = document.createElement('label');
  label.className = 'field-label';
  label.textContent = props['jcr:title'] || 'Upload Aadhar Card / PAN Card';

  // INNER BOX
  const box = document.createElement('div');
  box.className = 'upload-box';

  // INPUT
  const input = document.createElement('input');
  input.type = 'file';
  input.name = props.name || 'upload';

  if (props.accept) {
    input.accept = Array.isArray(props.accept)
      ? props.accept.join(',')
      : props.accept;
  }

  // BUTTON (TOP)
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = props.buttonText || 'Upload File';

  // DRAG TEXT (BOTTOM)
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
  box.addEventListener('dragover', (e) => {
    e.preventDefault();
    box.classList.add('dragover');
  });

  box.addEventListener('dragleave', () => {
    box.classList.remove('dragover');
  });

  box.addEventListener('drop', (e) => {
    e.preventDefault();
    box.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (!file) return;

    input.files = e.dataTransfer.files;
    fileName.textContent = `Selected: ${file.name}`;
  });

  // STRUCTURE
  box.append(input, button, dragText, fileName, error);
  wrapper.append(label, box);

  fieldDiv.innerHTML = '';
  fieldDiv.append(wrapper);

  return fieldDiv;
}
