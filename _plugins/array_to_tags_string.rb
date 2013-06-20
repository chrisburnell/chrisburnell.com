module Jekyll
  module Filters
    # Modification on the array_to_sentence_string filter
    # Adds strong tags around the tags
    def array_to_tags_string(array)
      connector = "and"
      case array.length
      when 0
        ""
      when 1
        "<strong>#{array[0].to_s}</strong>"
      when 2
        "<strong>#{array[0]}</strong> #{connector} <strong>#{array[1]}</strong>"
      else
        "<strong>#{array[0...-1].join(', ')},</strong> #{connector} <strong>#{array[-1]}</strong>"
      end
    end
  end
end