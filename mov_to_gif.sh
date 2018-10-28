#from https://gist.github.com/dergachev/4627207

#Install
#brew install ffmpeg 
#brew cask install xquartz 
#brew install gifsicle

ffmpeg -i demo.mov -s 1280x720 -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --delay=3 > out.gif