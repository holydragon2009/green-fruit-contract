import { storage } from 'near-sdk-as'

// Data Models Imports
import { GreenFruit, fruits } from './models'

const FRUIT_LIMIT = 10;

export function initContract(): void {
  /// Initializes the contract 
  assert(!storage.hasKey('init'), 'Already initialized')
  storage.set('init', true)
}

export function addFruit(name: string, sku_id: string): void {
  _isInit();
  const fruit = new GreenFruit(name, sku_id);
  // Adding the fruit to end of the persistent collection
  fruits.push(fruit);
}

export function getFruits(): GreenFruit[] {
  _isInit();
  const numFruits = min(FRUIT_LIMIT, fruits.length);
  const startIndex = fruits.length - numFruits;
  const result = new Array<GreenFruit>(numFruits);
  for(let i = 0; i < numFruits; i++) {
    result[i] = fruits[i + startIndex];
  }
  return result;
}


function _isInit(): void {
  assert(storage.hasKey('init') && storage.getSome<bool>('init') == true, 'The contract should be initialized before usage.')
}
