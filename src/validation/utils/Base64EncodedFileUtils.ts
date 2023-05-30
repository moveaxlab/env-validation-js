function getFormat(encodedFile: string): string {
  const match = encodedFile.match(/^data:[a-z]+\/([a-z]+);base64,.*$/);
  if (match === null) {
    return '';
  }

  return match[1];
}

function getType(encodedFile: string): string {
  const match = encodedFile.match(/^data:([a-z]+)\/[a-z]+;base64,.*$/);
  if (match === null) {
    return '';
  }

  return match[1];
}

function getSize(encodedFile: string): number {
  const match = encodedFile.match(/^data:[a-z]+\/[a-z]+;base64,(.*)$/);
  if (match === null) {
    return 0;
  }
  const file = match[1];
  let length = (file.length / 4) * 3;
  if (file.endsWith('==')) {
    length -= 2;
  } else if (file.endsWith('=')) {
    length -= 1;
  }

  return length;
}

export { getFormat, getType, getSize };
