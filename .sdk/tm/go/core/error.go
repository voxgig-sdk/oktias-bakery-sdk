package core

type OktiasBakeryError struct {
	IsOktiasBakeryError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOktiasBakeryError(code string, msg string, ctx *Context) *OktiasBakeryError {
	return &OktiasBakeryError{
		IsOktiasBakeryError: true,
		Sdk:              "OktiasBakery",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OktiasBakeryError) Error() string {
	return e.Msg
}
