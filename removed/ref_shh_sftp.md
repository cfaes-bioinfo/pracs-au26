
::: {.callout-note collapse="true"}
#### Interactive transfers with the `sftp` command _(Click to expand)_

FileZilla, which you used in class, is a graphical SFTP client.
You can also start an interactive SFTP session in a terminal with the `sftp` command:

**Logging in**

To log in to OSC's SFTP server, issue the following command in your local
computer's terminal,
substituting `<user>` by your OSC username:

```{.bash .norun}
sftp <user>@sftp.osc.edu   # E.g., 'jelmer@sftp.osc.edu'
```

``` {.bash-out}
The authenticity of host 'sftp.osc.edu (192.148.247.136)' can't be established.
ED25519 key fingerprint is SHA256:kMeb1PVZ1XVDEe2QiSumbM33w0SkvBJ4xeD18a/L0eQ.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

If this is your first time connecting to OSC's SFTP server,
you'll get a message like the one shown above:
you should type `yes` to confirm.

Then, you may be asked for your OSC password, and after that,
you should see a "welcome" message like this:

``` {.bash-out}
******************************************************************************

This system is for the use of authorized users only.  Individuals using
this computer system without authority, or in excess of their authority,
are subject to having all of their activities on this system monitored
and recorded by system personnel.  In the course of monitoring individuals
improperly using this system, or in the course of system maintenance,
the activities of authorized users may also be monitored.  Anyone using
this system expressly consents to such monitoring and is advised that if
such monitoring reveals possible evidence of criminal activity, system
personnel may provide the evidence of such monitoring to law enforcement
officials.

******************************************************************************
Connected to sftp.osc.edu.
```

Now, you will have an `sftp` prompt (`sftp>`) instead of a regular shell prompt.

Familiar commands like `ls`, `cd`, and `pwd` will operate on the remote computer
(OSC, in this case),
and there are **local counterparts for them: `lls`, `lcd`, `lpwd`** &mdash;
for example:

```{.bash .norun}
# NOTE: I am prefacing sftp commands with the 'sftp>' prompt to make it explicit
#       these should be issued in an sftp session; but don't type that part.
sftp> pwd
```

``` {.bash-out}
Remote working directory: /users/PAS0471/jelmer
```

```{.bash .norun}
sftp> lpwd
```

``` {.bash-out}
Local working directory: /Users/poelstra.1/Desktop
```

**Uploading files to OSC**

To upload files to OSC, use `sftp`'s **`put` command**.

The syntax is `put <local-path> <remote-path>`,
and unlike with `scp` etc., you don't need to include the address to the remote
(because in an `sftp` session, you are simultaneously connected to both computers).
But like with `cp` and `scp`, you'll need the `-r` flag for recursive transfers,
i.e. transferring a directory and its contents.

```{.bash .norun}
# Upload fastqc.sh in a dir 'scripts' on your local computer to your sandbox dir at OSC:
sftp> put scripts/fastqc.sh /fs/ess/PAS3493/people/jelmer/sandbox

# Use -r to transfer directories:
sftp> put -r scripts /fs/ess/PAS3493/people/jelmer/sandbox

# You can use wildcards to upload multiple files:
sftp> put scripts/*sh /fs/ess/PAS3493/people/jelmer/sandbox
```

::: {.callout-warning}
#### `sftp` is rather basic
`sftp` only knows a limited set of commands: type `help` to list them.
:::

**Downloading files from OSC**

To download files from OSC, use the `get` command,
which has the syntax `get <remote-path> <local-path>`
(this is the other way around from `put` in that the remote path comes first,
but the same in that both use the order `<source> <target>`, like `cp` and so on).

For example:

```{.bash .norun}
sftp> get /fs/ess/PAS3493/people/jelmer/garrigos/README.md .

sftp> get -r /fs/ess/PAS3493/people/jelmer/sandbox .
```

**Closing the SFTP connection**

When you're done, you can type `exit` or press <kbd>Ctrl</kbd>+<kbd>D</kbd>
to exit the `sftp` prompt.
:::
