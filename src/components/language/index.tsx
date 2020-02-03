import * as React from 'react';
import './index.scss';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function LanguageRow(props: any) {
    const language: ILanguage = props.language

    return (
      <tr key={props.index}>
        <td>{language.code}</td>
        <td>{language.name}</td>
        <td>{language.native}</td>
        <td>{language.rtl}</td>
      </tr>
    )
}

interface ILanguage {
    code: string;
    name: string;
    native: string;
    rtl: string;
}

class Language extends React.Component<any, any> {   

    public render(): JSX.Element {
        const { data: { loading, error, languages } } = this.props;

        if (loading) {
            return <p>Loading data.... </p>
        }

        if (error) {
            return <p>GraphQL error occured.... </p>
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Native</th>
                        <th>Rtl</th>
                    </tr>
                </thead>
                <tbody>
                {languages.map((language: ILanguage, index: number) =>
                    <LanguageRow key={index} language={language} index={index} />
                )}
                </tbody>
            </table>
        );
    }

}


export default graphql(gql`
    query{
        languages {
          code
          name
          native
          rtl
        }
    }
    `,
    {
    options: props => ({
        fetchPolicy: "cache-and-network",
        variables: {
            nextPageKey: 0,
        },
    })
})(Language);
