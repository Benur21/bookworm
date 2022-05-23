

with open('src/dictionaries/original/words_ptbr.txt') as f:
  raw = f.read()

chars = []
for char in raw:
  if not (char in chars):
    chars.append(char)

print(chars)

no = []
yes = []
for char in chars:
  print(char)
  inp = input("use or not?")
  if inp == 'y':
    yes.append(char)
  else:
    no.append(char)

print("no:", no)
print("yes:", yes)

no = ['\n', 'ª', '.', "'", 'è', 'º', ' ', 'ï', 'ü', 'å', '\x92', '²', '³',
 'ö', 'ë', 'ñ', 'Ø', 'ø', 'µ']
yes = ['a', 'à', 'á', 'ã', '-', 'm', 'i', 'l', 's', 'e', 'b', 'ê', 'c', 'é', 'ó',
 'u', 'h', 't', 'r', 'o', 'p', 'A', 'C', 'ú', 'n', 'q', 'd', 'v', 'k', 'ô', 'S',
  'y', 'ç', 'g', 'í', 'x', 'z', 'â', 'f', 'j', 'B', 'L', 'T', 'N', 'D', 'J', 'M',
   'O', 'Á', 'õ', 'K', 'P', 'R', 'V', 'H', 'I', 'F', 'U', 'E', 'Q', 'Â', 'Í', 'w',
    'Ô', 'X', 'W', 'î', 'Ê', 'É', 'Z', 'Ò', 'Ó', 'Ú', 'Y', 'G']

