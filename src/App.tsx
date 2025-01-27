import React, { useState } from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  const [settings, setSettings] = useState({
    pomodoroTime: 25, 
    shortRestTime: 5,
    longRestTime: 15,
    cycles: 4,
  });

  const [isConfigured, setIsConfigured] = useState(false);

  // Atualiza os valores das configurações com base no input do usuário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: Number(value),
    });
  };

  // Define que as configurações foram concluídas e inicia o timer
  const handleStart = () => {
    setIsConfigured(true);
  };

  return (
    <div className="container">
      {!isConfigured ? (
        <Configuration settings={settings} handleChange={handleChange} handleStart={handleStart} />
      ) : (
        <PomodoroTimer
          pomodoroTime={settings.pomodoroTime * 60} 
          shortRestTime={settings.shortRestTime * 60}
          longRestTime={settings.longRestTime * 60}
          cycles={settings.cycles}
        />
      )}
    </div>
  );
}

function Configuration({
  settings,
  handleChange,
  handleStart,
}: {
  settings: { pomodoroTime: number; shortRestTime: number; longRestTime: number; cycles: number };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleStart: () => void;
}) {
  return (
    <div className="configuration">
      <h2>Configuração do Pomodoro</h2>
      <label>
        Tempo de Pomodoro (em minutos):
        <input
          type="number"
          name="pomodoroTime"
          value={settings.pomodoroTime}
          onChange={handleChange}
          min="1"
        />
      </label>
      <label>
        Tempo de Descanso Curto (em minutos):
        <input
          type="number"
          name="shortRestTime"
          value={settings.shortRestTime}
          onChange={handleChange}
          min="1"
        />
      </label>
      <label>
        Tempo de Descanso Longo (em minutos):
        <input
          type="number"
          name="longRestTime"
          value={settings.longRestTime}
          onChange={handleChange}
          min="1"
        />
      </label>
      <label>
        Número de Ciclos:
        <input
          type="number"
          name="cycles"
          value={settings.cycles}
          onChange={handleChange}
          min="1" 
        />
      </label>
      <button onClick={handleStart}>Iniciar</button>
    </div>
  );
}

export default App;
