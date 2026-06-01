import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { parseAndValidateJson, fetchQuestionsFromUrl, saveCustomQuiz } from '../../utils/customQuizManager.ts';
import { type Question } from '../../assets/quizData.ts';
import './customQuizBuilder.css';

const extractColorFromSvg = (svgText: string): string | null => {
  const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const matches = svgText.match(hexRegex);

  if (matches) {
    for (const color of matches) {
      const lower = color.toLowerCase();
      if (
        lower !== '#ffffff' &&
        lower !== '#fff' &&
        lower !== '#000000' &&
        lower !== '#000' &&
        lower !== '#1a1a1a' &&
        lower !== '#0f0f0f' &&
        lower !== '#2e2e2e' &&
        lower !== '#444444'
      ) {
        return color;
      }
    }
  }

  const rgbRegex = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/g;
  const rgbMatches = svgText.match(rgbRegex);
  if (rgbMatches) {
    for (const color of rgbMatches) {
      const lower = color.toLowerCase().replace(/\s+/g, '');
      if (
        lower !== 'rgb(255,255,255)' &&
        lower !== 'rgba(255,255,255,1)' &&
        lower !== 'rgb(0,0,0)' &&
        lower !== 'rgba(0,0,0,1)'
      ) {
        return color;
      }
    }
  }

  return null;
};

const CustomQuizBuilder = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'paste' | 'url'>('paste');

  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [customSvgInput, setCustomSvgInput] = useState('');

  const [jsonInput, setJsonInput] = useState('');
  const [apiUrl, setApiUrl] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState<string | null>(null);
  const [validatedQuestions, setValidatedQuestions] = useState<Question[] | null>(null);

  const handleValidate = async () => {
    setValidationError(null);
    setValidationSuccess(null);
    setValidatedQuestions(null);

    if (!title.trim()) {
      setValidationError("Quiz Title is required.");
      return;
    }

    setIsLoading(true);

    try {
      let questions: Question[] = [];

      if (activeTab === 'paste') {
        if (!jsonInput.trim()) {
          throw new Error("Please paste some JSON questions first.");
        }
        questions = await parseAndValidateJson(jsonInput);
      } else {
        if (!apiUrl.trim()) {
          throw new Error("Please enter a valid URL API endpoint.");
        }
        if (!apiUrl.startsWith('http://') && !apiUrl.startsWith('https://')) {
          throw new Error("API URL must start with http:// or https://");
        }
        questions = await fetchQuestionsFromUrl(apiUrl);
      }

      setValidatedQuestions(questions);
      setValidationSuccess(`Successfully validated ${questions.length} questions! Ready to save.`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during validation.";
      setValidationError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSvgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'image/svg+xml' && !file.name.endsWith('.svg')) {
      setValidationError("Please select a valid SVG file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text.trim().startsWith('<svg')) {
        setCustomSvgInput(text);

        const extractedColor = extractColorFromSvg(text);
        if (extractedColor) {
          setSelectedColor(extractedColor);
        } else {
          setSelectedColor('#ffffff');
        }
      } else {
        setValidationError("The uploaded file does not appear to contain valid SVG code.");
      }
    };
    reader.onerror = () => {
      setValidationError("Failed to read the SVG file.");
    };
    reader.readAsText(file);
  };

  const handleSvgTextChange = (val: string) => {
    setCustomSvgInput(val);
    if (val.trim().startsWith('<svg')) {
      const extractedColor = extractColorFromSvg(val);
      if (extractedColor) {
        setSelectedColor(extractedColor);
      } else {
        setSelectedColor('#ffffff');
      }
    } else {
      setSelectedColor('#ffffff');
    }
  };

  const handleSaveQuiz = () => {
    if (!validatedQuestions || validatedQuestions.length === 0) return;

    let iconToSave: string | undefined = undefined;
    if (customSvgInput.trim()) {
      if (!customSvgInput.trim().startsWith('<svg')) {
        setValidationError("Please paste or upload a valid SVG code starting with <svg.");
        return;
      }
      iconToSave = customSvgInput;
    }

    try {
      saveCustomQuiz(title, description, validatedQuestions, selectedColor, iconToSave);
      navigate(`/home`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setValidationError(`Failed to save quiz: ${errorMessage}`);
    }
  };

  return (
    <div className="title-container custom-builder-page">
      <span className="persistent-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
        DevQuiz
      </span>

      <div className="builder-card">
        <h1 className="builder-header">Create Custom Quiz</h1>
        <p className="builder-subheader">Build a custom quiz by pasting raw JSON or fetching dynamically from a custom API endpoint.</p>

        <div className="builder-form-group">
          <label className="builder-label">Quiz Title *</label>
          <input
            type="text"
            className="builder-input"
            placeholder="e.g. Kubernetes Mastery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="builder-form-group">
          <label className="builder-label">Quiz Description</label>
          <input
            type="text"
            className="builder-input"
            placeholder="e.g. Test your containers and orchestration skills"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="builder-style-section">
          <h2 className="style-section-title">Card Icon</h2>

          <div className="custom-svg-upload-panel" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            <div className="upload-controls-row">
              <div className="file-upload-box">
                <span className="builder-label">Upload SVG File</span>
                <div className="file-drop-zone">
                  <input
                    type="file"
                    id="svg-file-picker"
                    accept=".svg,image/svg+xml"
                    onChange={handleSvgFileUpload}
                    className="file-hidden-input"
                  />
                  <label htmlFor="svg-file-picker" className="file-drop-label">
                    <span>Upload SVG file</span>
                  </label>
                </div>
              </div>

              <div className="textarea-upload-box">
                <span className="builder-label">Or Paste Raw &lt;svg&gt; Code</span>
                <textarea
                  className="builder-textarea svg-code-textarea"
                  placeholder="<svg viewBox='0 0 24 24'> ... </svg>"
                  value={customSvgInput}
                  onChange={(e) => handleSvgTextChange(e.target.value)}
                />
              </div>
            </div>

            {customSvgInput.trim().startsWith('<svg') && (
              <div className="svg-live-preview-box">
                <span className="builder-label">Live Preview (Accent Color Applied)</span>
                <div className="preview-row">
                  <div
                    className="live-preview-container"
                    dangerouslySetInnerHTML={{ __html: customSvgInput }}
                    style={{ color: selectedColor }}
                  />
                  <span className="preview-label">This icon will be used as the quiz card image.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="builder-tabs">
          <button
            className={`builder-tab-btn ${activeTab === 'paste' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('paste');
              setValidationError(null);
              setValidationSuccess(null);
            }}
            disabled={isLoading}
          >
            Paste JSON Format
          </button>
          <button
            className={`builder-tab-btn ${activeTab === 'url' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('url');
              setValidationError(null);
              setValidationSuccess(null);
            }}
            disabled={isLoading}
          >
            Fetch from API URL
          </button>
        </div>

        {activeTab === 'paste' && (
          <div className="builder-tab-content">
            <div className="tab-header-row">
              <span className="tab-instruction">Paste your questions JSON array matching the standard format:</span>
            </div>
            <textarea
              className="builder-textarea"
              placeholder="[\n  {\n    &quot;question&quot;: &quot;Question text here?&quot;,\n    &quot;options&quot;: [&quot;Option A&quot;, &quot;Option B&quot;],\n    &quot;correctAnswer&quot;: &quot;Option A&quot;,\n    &quot;difficulty&quot;: &quot;middle&quot;\n  }\n]"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        {activeTab === 'url' && (
          <div className="builder-tab-content">
            <span className="tab-instruction">Enter the URL endpoint from which to fetch the quiz questions:</span>
            <input
              type="url"
              className="builder-input url-input"
              placeholder="https://api.jsonbin.io/v3/b/..."
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}

        {validationError && (
          <div className="feedback-banner error-banner">
            <div className="feedback-text-content">
              <strong>Validation Error:</strong>
              <p className="feedback-desc">{validationError}</p>
            </div>
          </div>
        )}

        {validationSuccess && (
          <div className="feedback-banner success-banner">
            <div className="feedback-text-content">
              <strong>Validation Success!</strong>
              <p className="feedback-desc">{validationSuccess}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loader-container">
            <div className="spinner"></div>
            <span>Validating questions</span>
          </div>
        )}

        <div className="builder-actions">
          <button className="secondary-btn" onClick={() => navigate('/home')} disabled={isLoading}>
            Cancel
          </button>

          <button className="primary-btn" onClick={handleValidate} disabled={isLoading}>
            {isLoading ? "Processing..." : "Validate Questions"}
          </button>

          {validatedQuestions && validatedQuestions.length > 0 && !validationError && (
            <button className="save-btn" onClick={handleSaveQuiz} disabled={isLoading}>
              Save Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomQuizBuilder;
