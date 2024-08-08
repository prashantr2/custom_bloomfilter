import hashlib

def get_hash(key):
    return hashlib.sha256(key.encode()).hexdigest()

size = int(input('Enter the size of bloom filter: '))
bf = [0]*size

while True:
    key = input('Enter the key to check: ')
    hsh = int(get_hash(key), 16)
    idx = hsh % size
    if bf[idx] == 0:
        print('Key is not present')
        bf[idx] = 1
    else:
        print('Key may be present')