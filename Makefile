account=dconnolly@bmidev12
container=i2b2_brennan
target=/var/www/html/i2b2

update: work.tar
	scp -q work.tar $(account):b-work/
	ssh -q $(account) docker cp b-work/work.tar $(container):/tmp/work.tar
	ssh -q $(account) docker exec $(container) tar xvf /tmp/work.tar -C $(target)
	ssh -q $(account) docker exec $(container) chmod -R go+r $(target)

work.tar: every-time
	rm work.tar
	tar cf $@ `hg status -am --no-status`

.PHONY: every-time
