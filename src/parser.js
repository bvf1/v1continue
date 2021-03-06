/* eslint-disable no-param-reassign */
function changeFormat(input, change) {
  if (change === 'punct') {
    input = input.replace(/\./g, '');
    input = input.replace(/,/g, '.');
  } else {
    const s = input.split('e');
    const u = s[0] * 10 ** s[1];
    input = u.toString();
  }

  return input;
}

export function parse(input) {
  input = input.trim();
  const match = input.split(/\s+/);

  for (let i = match.length - 1; i >= 0; i-=1) {
    if (match[i].includes('e')) {
      if (input.match(/[0-9]+e-?[0-9]+/))
        match[i] = changeFormat(match[i], 'e');
      else match.splice(i, 1);
    } else if (match[i].includes(',') || match[i].includes('.'))
      match[i] = changeFormat(match[i], 'punct');
    else if (isNaN(match[i])) match.splice(i, 1);
  }

  if (match.length === 0) return ['No Numbers'];

  return match;
}
