# Recall

import eel

eel.init("web", allowed_extensions=['.js', '.html'])

@eel.expose
def signal():
	pass

eel.start("main.html")

