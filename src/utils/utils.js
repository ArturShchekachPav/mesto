import Card from "../components/Card";
import {cardConfig} from "./constants";
import {popupWithImage} from "../pages/index.js"

export function createCard(data) {
  const card = new Card(data, (src, name) => popupWithImage.open(src, name), cardConfig);
  return card.createCard();
}