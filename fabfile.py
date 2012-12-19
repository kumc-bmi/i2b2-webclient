'''fabfile -- automate deployment of i2b2 webclient

'''

__author__ = 'Dan Connolly'
__copyright__ = 'Copyright (c) 2012 University of Kansas Medical Center'
__license__ = 'MIT'
__contact__ = 'http://informatics.kumc.edu/'

from fabric.api import task, local


@task
def deploy_hg_tip(webspace='/srv/www/htdocs/',
                  i2b2path='i2b2/'):
    dest = webspace + i2b2path
    local('mkdir -p %s' % dest)
    local('hg archive %s' % dest)
    # hg archive sets permissions to 755 or 644.
    # We need them group-writeable.
    # This should only involve files that this user created.
    local('find %s -type d -name plot_output -prune -o -not -perm -g=w -print0 | '
          'xargs --no-run-if-empty -0 chmod g+w' % dest)
