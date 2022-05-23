import os

def allTrue(list):
  for elem in list:
    if elem == False:
      return False
  return True

def containsCharIn(string, charList):
  for char in charList:
    if char in string:
      return True
  return False
  

original_dicts_folder = 'src/dictionaries/original'
parsed_dicts_folder = 'src/dictionaries/parsed'

no = ['\n', 'ª', '.', "'", 'è', 'º', ' ', 'ï', 'ü', 'å', '\x92', '²', '³',
 'ö', 'ë', 'ñ', 'Ø', 'ø', 'µ']

for file_name in os.listdir(original_dicts_folder):
  with open(f'{original_dicts_folder}/{file_name}') as f:
    raw = f.read()
  
  lines = raw.split('\n')
  
  words = []
  for line in lines:
    # list of all expressions which the string has to pass
    exps = [
      len(line) >= 3,
      len(line) <= 16,
      not containsCharIn(line, no)
    ]
    if allTrue(exps):
      words.append(line)
  
  print(file_name)
  print(len(lines))
  print(len(words))
  print(f'-{len(lines)-len(words)} -{"%.1f" %((len(lines)-len(words))/len(lines)*100)}%')
  print()
  
  # transform it into js export
  words = [f"""export const {file_name.replace(".txt", "")} = `"""] + words + ["`;"]
  final_str = "\n".join(words)
  
  with open(f'{parsed_dicts_folder}/{file_name.replace(".txt", ".js")}', "w") as f:
    f.write(final_str)
  
  
  
  


