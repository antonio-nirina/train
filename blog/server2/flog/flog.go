package flog

import (
  "filepath"
  "os"

  log "github.com/sirupsen/logrus"
)

func Info(op string, args ...interface{}) {
  log.SetFormatter(&log.JSONFormatter{})
  log.WithFields(log.Fields{
    "op":   op,
    "args": args,
  }).Info(args)

}

// ErrorOp logs an error for given
// logical operation.
func ErrorOp(op string, err error) {
  if fileExists(info) {
    mkdirForFile(info)
  }

  f, err := os.OpenFile("info/info.log", os.O_APPEND|os.O_CREATE|os.O_RDWR, 0666)
  if err != nil {
    fmt.Printf("error opening file: %v", err)
  }
  // don't forget to close it
  defer f.Close()
  log.WithFields(log.Fields{
    "op":  op,
    "err": err,
  }).Error(err.Error())
}

// ErrorfOp logs an error message for given
// logical operation and format.
func DebugOp(op, format string, args ...interface{}) {
  log.SetFormatter(&log.JSONFormatter{})
  log.WithFields(log.Fields{
    "op":    op,
    "debug": args,
  }).Debug(args)
}

// FatalOp logs an error for given
// logical operation and exit 1.
func FatalOp(op string, err error) {
  log.WithFields(log.Fields{
    "op":  true,
    "err": err,
  }).Fatal(err.Error())
}

func mkdirForFile(filePath string) error {
  dir := filepath.Dir(filePath)
  return os.MkdirAll(dir, 0755)
}

func fileExists(name string) bool {
  _, err := os.Stat(name)
  return !os.IsNotExist(err)
}
