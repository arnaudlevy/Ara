import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';
import { NewFeedbackDto } from './new-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly config: ConfigService) {}

  async saveFeedback(feedback: NewFeedbackDto) {
    const data = {
      records: [
        {
          fields: {
            'Facile à utiliser': feedback.easyToUse,
            'Facile à comprendre': feedback.easyToUnderstand,
            'Remarques générales': feedback.feedback,
            Suggestions: feedback.suggestions,
            Nom: feedback.name,
            Email: feedback.email,
            Expertises: feedback.occupations,
            Source: 'Ara'
          },
        },
      ],
    };

    const response = await got
      .post(
        `https://api.airtable.com/v0/${this.config.get(
          'AIRTABLE_BASE_ID',
        )}/${this.config.get('AIRTABLE_TABLE_ID')}`,
        {
          json: data,
          headers: {
            Authorization: `Bearer ${this.config.get('AIRTABLE_ACCESS_TOKEN')}`,
          },
        },
      )
      .json<{ records: { id: string }[] }>();

    console.log('Added feedback to Airtable : %s', response.records[0].id);
  }
}
