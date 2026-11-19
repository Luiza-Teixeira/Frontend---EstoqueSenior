import { useAccessibilityPreferences } from '../../../hooks/useAccessibilityPreferences';
import { useInterfaceMode } from '../../../hooks/useInterfaceMode';
import type { TextSize } from '../../../types/accessibility-preferences';
import '../styles/settings.css';

interface TextSizeOption {
  value: TextSize;
  label: string;
  description: string;
  preview: string;
}

const textSizeOptions: TextSizeOption[] = [
  {
    value: 'default',
    label: 'Padrão',
    description: 'Tamanho normal dos textos do sistema.',
    preview: 'Aa',
  },
  {
    value: 'large',
    label: 'Grande',
    description: 'Aumenta os textos para facilitar a leitura.',
    preview: 'Aa',
  },
  {
    value: 'extra-large',
    label: 'Muito grande',
    description: 'Amplia ainda mais os textos da interface.',
    preview: 'Aa',
  },
];

export function SettingsPage() {
  const { mode, setMode } = useInterfaceMode();

  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
  } = useAccessibilityPreferences();

  const isSimplified = mode === 'simplified';

  return (
    <section
      className={`settings-page ${
        isSimplified
          ? 'settings-page--simplified'
          : ''
      }`}
      aria-labelledby="settings-title"
    >
      <header className="settings-header">
        <div>
          <span className="settings-kicker">
            Personalização
          </span>

          <h1 id="settings-title">
            Configurações
          </h1>

          <p>
            Ajuste o sistema para que ele fique mais
            confortável e fácil de usar no seu dia a dia.
          </p>
        </div>

        <div
          className="settings-status"
          aria-live="polite"
        >
          <span>Modo atual</span>

          <strong>
            {isSimplified
              ? 'Simplificado'
              : 'Padrão'}
          </strong>
        </div>
      </header>

      <div
        className="settings-tabs"
        aria-label="Áreas de configuração"
      >
        <button type="button">
          Perfil
        </button>

        <button
          type="button"
          className="settings-tab-active"
          aria-current="page"
        >
          Acessibilidade
        </button>

        <button type="button">
          Sistema
        </button>
      </div>

      <section
        className="settings-panel"
        aria-labelledby="interface-mode-title"
      >
        <div className="settings-panel-heading">
          <div
            className="settings-panel-icon"
            aria-hidden="true"
          >
            Aa
          </div>

          <div>
            <h2 id="interface-mode-title">
              Preferência de interface
            </h2>

            <p>
              Escolha como você deseja visualizar e
              utilizar o sistema.
            </p>
          </div>
        </div>

        <fieldset className="mode-fieldset">
          <legend className="sr-only">
            Escolha o modo da interface
          </legend>

          <div className="mode-options">
            <label
              className={`mode-card ${
                mode === 'standard'
                  ? 'mode-card--selected'
                  : ''
              }`}
            >
              <input
                type="radio"
                name="interface-mode"
                value="standard"
                checked={mode === 'standard'}
                onChange={() =>
                  setMode('standard')
                }
              />

              <span
                className="custom-radio"
                aria-hidden="true"
              />

              <div>
                <strong>Modo Padrão</strong>

                <p>
                  Mais controles e informações
                  disponíveis ao mesmo tempo.
                </p>

                <small>
                  Ideal para quem já possui
                  familiaridade com sistemas.
                </small>
              </div>
            </label>

            <label
              className={`mode-card ${
                mode === 'simplified'
                  ? 'mode-card--selected'
                  : ''
              }`}
            >
              <input
                type="radio"
                name="interface-mode"
                value="simplified"
                checked={mode === 'simplified'}
                onChange={() =>
                  setMode('simplified')
                }
              />

              <span
                className="custom-radio"
                aria-hidden="true"
              />

              <div>
                <strong>
                  Modo Simplificado
                </strong>

                <p>
                  Menos opções por vez, textos maiores
                  e ações mais diretas.
                </p>

                <small>
                  Ideal para quem prefere uma
                  navegação mais simples.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
      </section>

      <section
        className="settings-panel"
        aria-labelledby="text-size-title"
      >
        <div className="settings-panel-heading">
          <div
            className="settings-panel-icon"
            aria-hidden="true"
          >
            T
          </div>

          <div>
            <h2 id="text-size-title">
              Tamanho do texto
            </h2>

            <p>
              Ajuste o tamanho das letras em todo o
              sistema.
            </p>
          </div>
        </div>

        <fieldset className="mode-fieldset">
          <legend className="sr-only">
            Escolha o tamanho dos textos
          </legend>

          <div className="text-size-options">
            {textSizeOptions.map((option) => (
              <label
                key={option.value}
                className={`text-size-card ${
                  textSize === option.value
                    ? 'text-size-card--selected'
                    : ''
                }`}
              >
                <input
                  type="radio"
                  name="text-size"
                  value={option.value}
                  checked={
                    textSize === option.value
                  }
                  onChange={() =>
                    setTextSize(option.value)
                  }
                />

                <span
                  className={`text-size-preview text-size-preview--${option.value}`}
                  aria-hidden="true"
                >
                  {option.preview}
                </span>

                <div>
                  <strong>{option.label}</strong>

                  <p>
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section
        className="settings-panel"
        aria-labelledby="contrast-title"
      >
        <div className="settings-panel-heading">
          <div
            className="settings-panel-icon"
            aria-hidden="true"
          >
            ◐
          </div>

          <div>
            <h2 id="contrast-title">
              Alto contraste
            </h2>

            <p>
              Aumente a diferença entre textos,
              controles e fundos.
            </p>
          </div>
        </div>

        <label className="contrast-option">
          <div>
            <strong>
              Usar alto contraste
            </strong>

            <p>
              Usa cores mais fortes para facilitar a
              identificação dos elementos da
              interface.
            </p>
          </div>

          <input
            type="checkbox"
            checked={highContrast}
            onChange={(event) =>
              setHighContrast(
                event.target.checked,
              )
            }
          />

          <span
            className="contrast-switch"
            aria-hidden="true"
          />
        </label>
      </section>

      <aside className="settings-accessibility-tip">
        <div aria-hidden="true">i</div>

        <p>
          <strong>Dica:</strong> essas preferências
          alteram apenas a forma como o sistema é
          apresentado. Produtos, vendas e informações
          do estoque continuam iguais.
        </p>
      </aside>
    </section>
  );
}