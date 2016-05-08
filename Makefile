del:
	rm -Rf .git
	git init
	git add .
	git commit -m'начал с нуля'
	git remote add origin git@github.com:allakin/art6_maket.git
	git push -u -f origin --all