#!/bin/bash
cd `sites/sitetestamazing $0`

tar --strip-components 1 -xzvf site.tgz
rm site.tgz
