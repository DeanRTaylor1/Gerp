package utils

import "path"

func GetContentTypeByFileExtension(filename string) string {
	switch path.Ext(filename) {
	case ".css":
		return ContentTypeCSS
	case ".js":
		return ContentTypeJavaScript
	case ".png":
		return ContentTypePNG
	case ".jpg", ".jpeg":
		return ContentTypeJPG
	case ".svg":
		return ContentTypeSVG
	default:
		return "application/octet-stream"
	}
}
