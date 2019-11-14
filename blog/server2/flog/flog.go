package flog

import (
	log "github.com/sirupsen/logrus"
)


func Info(op string, args ...interface{}) {
	log.SetFormatter(&log.JSONFormatter{})
	log.WithFields(log.Fields{
    "op": op,
    "args":   args,
  }).Info(args)

}

// ErrorOp logs an error for given
// logical operation.
func ErrorOp(op string, err error) {
	log.WithFields(log.Fields{
    "op": op,
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
func  FatalOp(op string, err error) {
	log.WithFields(log.Fields{
    "op":    true,
    "err": err,
  }).Fatal(err.Error())
}

