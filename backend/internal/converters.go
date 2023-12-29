package internal

import (
	"time"

	"github.com/jackc/pgx/v5/pgtype"
)

func Int64ToPGInt4(value int64) pgtype.Int4 {
	if value == 0 {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: int32(value), Valid: true}
}

func Int32ToPGInt4(value int32) pgtype.Int4 {
	if value == 0 {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: value, Valid: true}
}

func StringToPGText(str *string) pgtype.Text {
	if str == nil {
		return pgtype.Text{Valid: false}
	}
	return pgtype.Text{String: *str, Valid: true}
}

func TimeToPGTimestamp(t time.Time) pgtype.Timestamp {
	if t.IsZero() {
		return pgtype.Timestamp{Valid: false}
	}
	return pgtype.Timestamp{Time: t, Valid: true}
}

func PointerInt64ToPGInt4(i *int64) pgtype.Int4 {
	if i == nil {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: int32(*i), Valid: true}
}

func PointerInt32ToPGInt4(i *int32) pgtype.Int4 {
	if i == nil {
		return pgtype.Int4{Valid: false}
	}
	return pgtype.Int4{Int32: *i, Valid: true}
}
