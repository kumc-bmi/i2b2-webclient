'''fabfile -- automate deployment of i2b2 webclient

'''

__author__ = 'Dan Connolly'
__copyright__ = 'Copyright (c) 2012 University of Kansas Medical Center'
__license__ = 'MIT'
__contact__ = 'http://informatics.kumc.edu/'

from fabric.api import task, local, cd


@task
def deploy_hg_tip(localsrc='/usr/local/src/i2b2-webclient',
                  webspace='/srv/www/htdocs/',
                  i2b2path='i2b2/'):
    dest = webspace + i2b2path
    local('mkdir -p %s' % dest)
    with cd(localsrc):
        local('hg archive %s' % dest)
