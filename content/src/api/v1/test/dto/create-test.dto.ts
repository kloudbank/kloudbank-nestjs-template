import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @ApiProperty({
    description: 'Test Content',
    default: {
      title: 'Hello',
      'bp-test': { id: 1, name: 'bp-name' },
      template: { type: 'survey', if: 'rdb' },
      fields: {
        date: '2022-01-01',
        qty: '100',
        etc: {
          code: 200,
          status: {
            enabled: true,
            message: 'test',
          },
        },
        answer_dict: { a: 'answer a', b: 'answer b' },
        answer_list: [{ a: 'answer a' }, { b: 'answer b' }],
      },
      'test-list': ['list001', 'list002', 'list003'],
    },
  })
  readonly content: JSON;
}
