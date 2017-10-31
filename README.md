# cfenv-one-liner

This is the CLI that makes the result of the cf env command the value of one line of VCAP_SERVICES or VCAP_APPLICATION.


## Install
```
npm install -D cfenv-one-liner
```

## How to use

* Get VCAP_SERVICES by cf env command

    ```
    $ cf env sieg | node node_modules/cfenv-one-liner -p VCAP_SERVICES
    {"cloudantNoSQLDB":[{"credentials":{"host":"815bee23-b7cd-40d1-b15b-de047eb66122-bluemix....}]}
    ```

* Get VCAP_APPLICATION by file (redirect of cf env)

    ```
    $ node node_modules/cfenv-one-liner -p VCAP_APPLICATION test/cf_env_result.txt
    {"application_id":"fd17136e-5a8d-4f85-9873-....","application_name":"sieg","application_uris":["sieg.m....}
    ```

* Help

    ```
    $ node node_modules/cfenv-one-liner -h
    USAGE:
       node cfenv_one_line -p PROPERTY_NAME [file] [-h|--help]
    
    OPTIONS
       -p   PROPERTY_NAME: VCAP_SERVICES or VCAP_APPLICATION
    
    USAGE:
       node cfenv_one_line -p PROPERTY_NAME [file] [-h|--help]
    OPTIONS
       -p   PROPERTY_NAME: VCAP_SERVICES or VCAP_APPLICATION
    ```
