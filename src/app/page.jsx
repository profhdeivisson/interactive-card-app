"use client";

import Card from "../components/Card";
import Form from "../components/Form";
import Confirmation from "../components/Confirmation";
import '../../styles/globals.css';
import { CardProvider, useCard } from '../context/CardContext';

// Componente Home
const HomeContent = () => {
  const { confirmed } = useCard();

  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="relative p-8 max-w-6xl w-full flex lg:space-x-10 min-h-full justify-around lg:justify-between flex-col md:flex-row">
        <div className="flex-shrink-0 relative">
          <Card />
        </div>

        <div className="w-full lg:w-auto lg:ps-20 lg:content-center">
          {!confirmed ? (
            <Form />
          ) : (
            <Confirmation />
          )}
        </div>
      </div>
    </main>
  );
};

export default function Home() {
  return (
    <CardProvider>
      <HomeContent />
    </CardProvider>
  );
}
