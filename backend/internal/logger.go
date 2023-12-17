package internal

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type FileHandler struct {
	file *os.File
}

type LogEntry struct {
	Timestamp time.Time `json:"timestamp"`
	Message   string    `json:"msg"`
	Level     string    `json:"level"`
	Label     string    `json:"label"`
	PID       int       `json:"pid"`
	Hostname  string    `json:"hostname"`
}

func NewLogEntry(level, message, label string) LogEntry {
	hostname, err := os.Hostname()
	if err != nil {
		hostname = "unknown"
	}

	return LogEntry{
		Timestamp: time.Now(),
		Message:   message,
		Level:     level,
		Label:     label,
		PID:       os.Getpid(),
		Hostname:  hostname,
	}
}

func NewFileHandler(logDir, logType string) (*FileHandler, error) {
	today := time.Now().Format("2006-01-02")
	logFileName := fmt.Sprintf("%s.log", today)

	logFilePath := filepath.Join(logDir, logType, logFileName)

	if err := os.MkdirAll(filepath.Join(logDir, logType), 0700); err != nil {
		return nil, err
	}

	file, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
	if err != nil {
		return nil, err
	}

	return &FileHandler{
		file: file,
	}, nil
}

func (fh *FileHandler) Log(entry LogEntry) {
	logJSON, err := json.Marshal(entry)
	if err != nil {
		fmt.Println("Error marshaling log entry:", err)
		return
	}

	logJSON = append(logJSON, '\n')
	_, err = fh.file.Write(logJSON)
	if err != nil {
		fmt.Println("Error writing log entry:", err)
	}
}

func (fh *FileHandler) Close() {
	if fh.file != nil {
		fh.file.Close()
	}
}

type Logger struct {
	debugHandler *FileHandler
	errorHandler *FileHandler
}

func NewLogger(logDir string) (*Logger, error) {
	debugHandler, err := NewFileHandler(logDir, "debug")
	if err != nil {
		return nil, err
	}

	errorHandler, err := NewFileHandler(logDir, "error")
	if err != nil {
		debugHandler.Close()
		return nil, err
	}

	return &Logger{
		debugHandler: debugHandler,
		errorHandler: errorHandler,
	}, nil
}

func (l *Logger) logToHandler(handler *FileHandler, level, message string) {
	entry := NewLogEntry(level, message, "INFO")
	handler.Log(entry)
}

func (l *Logger) Debug(message string) {
	l.logToHandler(l.debugHandler, "DEBUG", message)
}

func (l *Logger) Error(message string) {
	l.logToHandler(l.errorHandler, "ERROR", message)
}

func (l *Logger) Info(message string) {
	fmt.Println(message)
}

func (l *Logger) Close() {
	if l.debugHandler != nil {
		l.debugHandler.Close()
	}
	if l.errorHandler != nil {
		l.errorHandler.Close()
	}
}
