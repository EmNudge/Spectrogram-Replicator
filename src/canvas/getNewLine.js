import { getRandColor } from './index'
import { lines } from '../stores/canvas'
import { get } from 'svelte/store'

export default function getNewLine() {
  return { 
    hue: getRandColor(), 
    name: `Line ${get(lines).size + 1}`,
    keyframes: [], 
  }
}