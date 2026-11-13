import { useInterfaceMode } from '../../../hooks/useInterfaceMode';
import '../styles/settings.css';

export function SettingsPage() {
  const { mode, setMode } = useInterfaceMode();

  const isSimplified = mode === 'simplified';

  return (
    <section
      className={`settings-page ${
        isSimplified ? 'settings-page--simplified' : ''
      }`}
      aria-labelledby="settings-title"
    >
      <header className="settings-header">
        <div>
          <span className="settings-kicker">
            Personalização
          </span>

          <h1 id="settings-title">Configurações</h1>

          <p>
            Ajuste o sistema para que ele fique mais confortável e fácil
            de usar no seu dia a dia.
          </p>
        </div>

        <div className="settings-status" aria-live="polite">
          <span>Modo atual</span>

          <strong>
            {isSimplified ? 'Simplificado' : 'Padrão'}
          </strong>
        </div>
      </header>

      <div className="settings-tabs" aria-label="Áreas de configuração">
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
          <div className="settings-panel-icon" aria-hidden="true">
            Aa
          </div>

          <div>
            <h2 id="interface-mode-title">
              Preferência de interface
            </h2>

            <p>
              Escolha como você deseja visualizar e utilizar o sistema.
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
                onChange={() => setMode('standard')}
              />

              <span className="custom-radio" aria-hidden="true" />

              <div>
                <strong>Modo Padrão</strong>

                <p>
                  Mais controles e informações disponíveis ao mesmo
                  tempo.
                </p>

                <small>
                  Ideal para quem já possui familiaridade com sistemas.
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
                onChange={() => setMode('simplified')}
              />

              <span className="custom-radio" aria-hidden="true" />

              <div>
                <strong>Modo Simplificado</strong>

                <p>
                  Menos opções por vez, textos maiores e ações mais
                  diretas.
                </p>

                <small>
                  Ideal para quem prefere uma navegação mais simples.
                </small>
              </div>
            </label>
          </div>
        </fieldset>
      </section>

      <aside className="settings-accessibility-tip">
        <div aria-hidden="true">i</div>

        <p>
          <strong>Dica:</strong> trocar o modo da interface não altera
          produtos, vendas ou informações do estoque. Apenas muda a
          forma como o sistema é apresentado.
        </p>
      </aside>
    </section>
  );
}