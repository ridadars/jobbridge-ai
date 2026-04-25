import { useState, useRef } from 'react'

function FileUpload({ onFileSelect, accept = '.pdf' }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  function handleFile(file) {
    if (!file) return
    const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase())
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    const isValid = acceptedTypes.includes(fileExt) || acceptedTypes.includes(file.type)
    if (!isValid) {
      setError(`Invalid file type. Please upload a ${accept} file.`)
      setSelectedFile(null)
      return
    }
    setError('')
    setSelectedFile(file)
    onFileSelect(file)
  }

  function handleClick()        { inputRef.current?.click() }
  function handleInputChange(e) { handleFile(e.target.files[0]) }
  function handleDragOver(e)    { e.preventDefault(); setDragging(true) }
  function handleDragLeave(e)   { e.preventDefault(); setDragging(false) }
  function handleDrop(e)        { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }

  const borderColor = dragging
    ? 'rgba(255,216,77,0.5)'
    : selectedFile
      ? 'rgba(255,216,77,0.35)'
      : 'rgba(255,255,255,0.1)'

  const bgColor = dragging
    ? 'rgba(255,216,77,0.06)'
    : selectedFile
      ? 'rgba(255,216,77,0.04)'
      : 'rgba(255,255,255,0.02)'

  return (
    <div style={{ width: '100%' }}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${borderColor}`,
          borderRadius: '14px',
          padding: '40px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          background: bgColor,
          transition: 'all 0.25s ease',
        }}
      >
        {selectedFile ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(255,216,77,0.08)',
              border: '1px solid rgba(255,216,77,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFD84D',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
              {selectedFile.name}
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', fontWeight: 400 }}>
              {(selectedFile.size / 1024).toFixed(1)} KB · Click to change
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.35)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600, color: '#F8FAFC', marginBottom: '6px' }}>
                {dragging ? 'Drop file here' : 'Drag & drop or click to upload'}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500 }}>
                {accept.toUpperCase()} format supported
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(255,160,160,0.8)',
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          fontWeight: 300,
          letterSpacing: '0.04em',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}
    </div>
  )
}

export default FileUpload