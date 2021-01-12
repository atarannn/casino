from random import choices

combo = choices(range(8), k = 5)
print(combo)

kits = {}

for index, item in enumerate(combo[:-1]):
	kit = [item]
	for subitem in (combo+['_'])[index+1:]:
		if subitem == item:
			kit.append(subitem)
		else:
			if len(kit) > 1 and item not in kits:
				kits[item] = kit
			break

print(kits)