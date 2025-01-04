import { motion } from "framer-motion";
import React from "react";

import { EXERCISE_TIMING } from "@/constants/exercise";
import { showToast } from "@/helpers/toast";
import { cn } from "@/lib/utils";

import "./Memory.css";

import BaseExercise from "./Base";

class MemoryExercise extends BaseExercise {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.shuffleCards(props.pairs.concat(props.pairs)),
      flipped: [], // Currently flipped cards (max 2)
      matched: [], // Cards that have been matched
      canFlip: true, // Prevents flipping while checking or animating
    };
  }

  shuffleCards(cards) {
    return [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uniqueId: index }));
  }

  handleCardClick = (index) => {
    const { flipped, matched, canFlip, cards } = this.state;

    // Prevent flipping if:
    // - animations are running
    // - card is already flipped
    // - card is already matched
    // - two cards are already flipped
    if (
      !canFlip ||
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length === 2
    )
      return;

    // Add card to flipped array
    const newFlipped = [...flipped, index];
    this.setState({ flipped: newFlipped });

    // If this is the second card
    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Prevent further card flips while checking
      this.setState({ canFlip: false });

      // Check if cards match
      if (firstCard.family === secondCard.family) {
        // Match found!
        showToast.success("Match found!");
        setTimeout(() => {
          this.setState(
            {
              matched: [...matched, firstIndex, secondIndex],
              flipped: [],
              canFlip: true,
            },
            () => {
              // Check if game is complete
              if (this.state.matched.length === cards.length) {
                this.handleComplete();
              }
            },
          );
        }, EXERCISE_TIMING.MEMORY_CARD_FLIP_DELAY);
      } else {
        // No match, flip cards back
        showToast.error("Try again!");
        setTimeout(() => {
          this.setState({
            flipped: [],
            canFlip: true,
          });
        }, EXERCISE_TIMING.MEMORY_CARD_FLIP_DELAY);
      }
    }
  };

  renderExercise() {
    const { cards, flipped, matched } = this.state;

    return (
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.uniqueId}
              className={cn(
                "memory-card",
                (flipped.includes(index) || matched.includes(index)) &&
                  "flipped",
                flipped.includes(index) && "highlighted",
              )}
              onClick={() => this.handleCardClick(index)}
            >
              <div className="card-inner">
                {/* Front of card (flower icon) */}
                <div className="card-front">
                  <div className="bg-emerald-100 w-full h-full flex items-center justify-center">
                    <span className="text-2xl">🌿</span>
                  </div>
                </div>

                {/* Back of card (flower image) */}
                <div
                  className={cn(
                    "card-back",
                    matched.includes(index) && "matched",
                  )}
                >
                  <img
                    src={card.image}
                    alt="Plant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-green-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(matched.length / cards.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    );
  }
}

export default MemoryExercise;
